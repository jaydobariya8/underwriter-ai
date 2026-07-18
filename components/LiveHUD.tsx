"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { postDebrief, postExchange } from "@/lib/api";
import type { Exchange, Speaker } from "@/types";
import { AgentOutputPanel } from "./AgentOutputPanel";
import { Skeleton } from "./ui";

interface ScriptedLine {
  seq: number;
  speaker: Speaker;
  text: string;
}

interface Props {
  dealId: string;
  header: string;
  scriptedLines: ScriptedLine[];
  initialExchanges: Exchange[];
  voiceAvailable: boolean;
}

const SPEAKERS: Speaker[] = ["LEV FIN", "SPONSOR", "CEO", "MANAGEMENT", "ANALYST"];

export function LiveHUD({ dealId, header, scriptedLines, initialExchanges, voiceAvailable }: Props) {
  const router = useRouter();
  const [exchanges, setExchanges] = useState<Exchange[]>(initialExchanges);
  const [scriptCursor, setScriptCursor] = useState(initialExchanges.length);
  const [loading, setLoading] = useState(false);
  const [ending, setEnding] = useState(false);
  const [customText, setCustomText] = useState("");
  const [customSpeaker, setCustomSpeaker] = useState<Speaker>("SPONSOR");
  const [error, setError] = useState<string | null>(null);
  const [voiceOn, setVoiceOn] = useState(voiceAvailable);
  const [speaking, setSpeaking] = useState<Speaker | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speakSeqRef = useRef(0);

  const nextLine = scriptedLines[scriptCursor];
  const latest = exchanges[exchanges.length - 1];
  const allRules = useMemo(
    () => exchanges.flatMap((e) => e.rules_fired ?? []),
    [exchanges],
  );

  // Speak a counterparty line via ElevenLabs. Fire-and-forget: audio is an
  // enhancement, so any failure is swallowed and the transcript still advances.
  const speak = useCallback(
    async (speaker: Speaker, text: string) => {
      if (!voiceAvailable || !voiceOn || !text.trim()) return;
      const seq = ++speakSeqRef.current;

      // Interrupt whatever is currently playing so lines never overlap.
      if (audioRef.current) audioRef.current.pause();

      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ speaker, text }),
        });
        if (!res.ok || seq !== speakSeqRef.current) return;

        const blob = await res.blob();
        if (seq !== speakSeqRef.current) return;

        const url = URL.createObjectURL(blob);
        let audio = audioRef.current;
        if (!audio) {
          audio = new Audio();
          audioRef.current = audio;
        }
        audio.src = url;
        const clear = () => {
          if (seq === speakSeqRef.current) setSpeaking(null);
          URL.revokeObjectURL(url);
        };
        audio.onplay = () => {
          if (seq === speakSeqRef.current) setSpeaking(speaker);
        };
        audio.onended = clear;
        audio.onerror = clear;
        await audio.play().catch(() => setSpeaking(null));
      } catch {
        setSpeaking(null);
      }
    },
    [voiceAvailable, voiceOn],
  );

  // Speak the line immediately (real-call feel) while the agent analyses it.
  function playAndSend(speaker: Speaker, text: string, advanceScript: boolean) {
    void speak(speaker, text);
    void send(speaker, text, advanceScript);
  }

  function stopVoice() {
    speakSeqRef.current += 1;
    if (audioRef.current) audioRef.current.pause();
    setSpeaking(null);
  }

  async function send(speaker: Speaker, text: string, advanceScript: boolean) {
    setLoading(true);
    setError(null);
    try {
      const { exchange } = await postExchange(dealId, speaker, text);
      setExchanges((prev) => [...prev, exchange]);
      if (advanceScript) setScriptCursor((c) => c + 1);
      requestAnimationFrame(() => {
        feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Agent request failed");
    } finally {
      setLoading(false);
    }
  }

  async function endCall() {
    stopVoice();
    setEnding(true);
    try {
      await postDebrief(dealId);
      router.push(`/deals/${dealId}/debrief`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Debrief failed");
      setEnding(false);
    }
  }

  if (ending) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <div className="text-gold text-2xl">◆</div>
        <div className="label">Generating debrief…</div>
        <Skeleton className="h-2 w-64" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <span className="sr-only" aria-live="polite">
        {speaking ? `${speaking} is speaking` : ""}
      </span>
      <div className="panel flex items-center justify-between gap-3 px-4 py-2.5">
        <div className="mono truncate text-sm text-text-2">{header}</div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (voiceOn) stopVoice();
              setVoiceOn((v) => !v);
            }}
            disabled={!voiceAvailable}
            aria-pressed={voiceOn}
            title={
              voiceAvailable
                ? voiceOn
                  ? "Voice on — counterparty lines are spoken aloud"
                  : "Voice off"
                : "Set ELEVENLABS_API_KEY to enable live voice"
            }
            className={`inline-flex min-w-[74px] items-center justify-center gap-2 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
              voiceOn && voiceAvailable
                ? "border-gold/50 bg-gold/10 text-gold"
                : "border-border text-text-2 hover:text-text"
            }`}
          >
            {voiceOn && voiceAvailable ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H2v6h4l5 4V5z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H2v6h4l5 4V5z" />
                <path d="m23 9-6 6M17 9l6 6" />
              </svg>
            )}
            {speaking ? (
              <span className="eq" aria-hidden="true">
                <span className="eq-bar" />
                <span className="eq-bar" />
                <span className="eq-bar" />
              </span>
            ) : (
              <span>Voice</span>
            )}
          </button>
          <div className="flex items-center gap-2 text-red">
            <span className="h-2 w-2 rounded-full bg-red animate-livePulse" />
            <span className="label text-red">Rec</span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.05fr_1fr]">
        {/* LEFT — transcript feed + controls */}
        <div className="panel flex h-[68vh] flex-col p-0">
          <div className="hairline px-4 py-2">
            <span className="label">Transcript</span>
          </div>
          <div ref={feedRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {exchanges.length === 0 ? (
              <div className="text-sm text-text-2">
                Call is live. Play the next exchange, or type a line the counterparty might say.
              </div>
            ) : (
              exchanges.map((ex, i) => {
                const isSpeaking = i === exchanges.length - 1 && speaking === ex.speaker;
                return (
                  <div
                    key={ex.id}
                    className={`animate-fadeUp rounded-md px-2 py-1.5 transition-colors ${
                      isSpeaking ? "bg-gold/5 ring-1 ring-gold/25" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`label ${isSpeaking ? "text-gold" : "text-text-2"}`}>{ex.speaker}</span>
                      {isSpeaking ? (
                        <span className="eq eq-sm" aria-label="speaking">
                          <span className="eq-bar" />
                          <span className="eq-bar" />
                          <span className="eq-bar" />
                        </span>
                      ) : null}
                      {voiceAvailable ? (
                        <button
                          type="button"
                          onClick={() => speak(ex.speaker, ex.speaker_text)}
                          title="Replay voice"
                          aria-label={`Replay ${ex.speaker}`}
                          className="ml-auto text-text-2 transition-colors hover:text-gold"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                            <path d="M3 3v5h5" />
                          </svg>
                        </button>
                      ) : null}
                    </div>
                    <div className="mt-1 text-sm leading-relaxed text-text">{ex.speaker_text}</div>
                  </div>
                );
              })
            )}
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-11/12" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            ) : null}
          </div>

          <div className="hairline border-t p-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!nextLine || loading}
                onClick={() => nextLine && playAndSend(nextLine.speaker, nextLine.text, true)}
                className="rounded-md bg-gold/90 px-3 py-2 text-sm font-medium text-[#1a140a] disabled:opacity-40"
              >
                ▶ Next exchange {nextLine ? `(${scriptCursor + 1}/${scriptedLines.length})` : "— done"}
              </button>
              <button
                type="button"
                disabled={loading || exchanges.length === 0}
                onClick={endCall}
                className="ml-auto rounded-md border border-red/60 px-3 py-2 text-sm text-red hover:bg-red/10 disabled:opacity-40"
              >
                ■ End call → Debrief
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <select
                value={customSpeaker}
                onChange={(e) => setCustomSpeaker(e.target.value as Speaker)}
                className="rounded border border-border bg-panel-2 px-2 py-2 text-xs text-text-2"
              >
                {SPEAKERS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && customText.trim() && !loading) {
                    playAndSend(customSpeaker, customText.trim(), false);
                    setCustomText("");
                  }
                }}
                placeholder="Type a line the counterparty says…  ↵"
                className="mono flex-1 rounded border border-border bg-panel-2 px-3 py-2 text-sm text-text outline-none focus:border-gold/50"
              />
            </div>
            {error ? <div className="mt-2 text-xs text-red">{error}</div> : null}
          </div>
        </div>

        {/* RIGHT — agent output */}
        <div className="panel flex h-[68vh] flex-col p-0">
          <div className="hairline px-4 py-2">
            <span className="label">Agent output</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
                <div className="label text-text-2">Analyzing exchange…</div>
              </div>
            ) : latest?.agent_output ? (
              <AgentOutputPanel output={latest.agent_output} />
            ) : (
              <div className="text-sm text-text-2">Agent standing by — awaiting first statement.</div>
            )}
          </div>
        </div>
      </div>

      {/* Rules-fired ticker */}
      <div className="panel flex flex-wrap items-center gap-2 px-4 py-2.5">
        <span className="label mr-1">Rules fired</span>
        {allRules.length === 0 ? (
          <span className="text-xs text-text-2">—</span>
        ) : (
          allRules.map((r, i) => (
            <span
              key={i}
              className="mono rounded border border-border bg-panel-2 px-2 py-0.5 text-[11px] text-gold"
            >
              {r}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
