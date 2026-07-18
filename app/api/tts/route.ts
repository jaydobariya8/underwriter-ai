import { NextResponse } from "next/server";
import { z } from "zod";
import { ELEVENLABS_MODEL, hasElevenLabs, voiceForSpeaker } from "@/lib/config";

export const runtime = "nodejs";
export const maxDuration = 30;

const ELEVENLABS_BASE = "https://api.elevenlabs.io/v1/text-to-speech";

// Cap request size: a single spoken line is short. Bounding it prevents a public
// endpoint from being used to run up ElevenLabs cost or as a crude DoS vector.
const MAX_TTS_CHARS = 2000;

const schema = z.object({
  text: z.string().trim().min(1).max(MAX_TTS_CHARS),
  speaker: z.string().max(40).optional(),
});

/**
 * Server-side ElevenLabs proxy for live-call voice.
 *
 * The browser POSTs the counterparty's line + speaker; we synthesize it with a
 * per-speaker voice and stream the MP3 straight back so playback can begin
 * before generation fully completes (real-call feel). The API key stays here
 * and is never exposed to the client.
 */
export async function POST(req: Request) {
  if (!hasElevenLabs) {
    return NextResponse.json(
      { enabled: false, error: "ElevenLabs is not configured (set ELEVENLABS_API_KEY)." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { text } = parsed.data;
  const voiceId = voiceForSpeaker(parsed.data.speaker ?? "");

  let upstream: Response;
  try {
    upstream = await fetch(
      `${ELEVENLABS_BASE}/${voiceId}/stream?optimize_streaming_latency=3&output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY as string,
          "content-type": "application/json",
          accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: ELEVENLABS_MODEL,
          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.75,
            style: 0.15,
            use_speaker_boost: true,
          },
        }),
      },
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to reach ElevenLabs", detail: e instanceof Error ? e.message : String(e) },
      { status: 502 },
    );
  }

  if (!upstream.ok || !upstream.body) {
    // Log the upstream reason server-side; don't echo provider detail to the client.
    const detail = await upstream.text().catch(() => "");
    console.error(`[tts] ElevenLabs error ${upstream.status}: ${detail.slice(0, 500)}`);
    return NextResponse.json({ error: "Voice synthesis unavailable" }, { status: 502 });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "content-type": "audio/mpeg",
      "cache-control": "no-store",
    },
  });
}
