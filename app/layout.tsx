import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Applies the saved product theme before first paint (no dark flash for light-mode
// users). Lives in the root layout so it runs on every hard load and the resulting
// `data-theme` attribute survives client-side navigation between marketing and app.
const THEME_BOOTSTRAP = `try{var t=localStorage.getItem('uw-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}`;

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-mono-jb", subsets: ["latin"] });

// Marketing display face.
// Brand direction calls for Söhne Light 300. When the licensed webfont file is
// available, drop it in at `app/fonts/sohne-light.woff2` and swap this block for:
//   import localFont from "next/font/local";
//   const sohne = localFont({ src: "./fonts/sohne-light.woff2", weight: "300",
//     display: "swap", variable: "--font-display" });
// then add `sohne.variable` to the <html> className. Until then --font-display
// resolves through the Inter variable so no external request is made and the
// build stays green.

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://underwriter.ai"),
  title: {
    default: "Underwriter AI | AI Credit Analyst for Leveraged Finance",
    template: "%s | Underwriter AI",
  },
  description:
    "Underwriter AI turns institutional credit judgment into live, auditable guidance across pre-call, live call, and post-call diligence.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrains.variable} h-full`}
      style={{ ["--font-display" as string]: "var(--font-inter)" }}
    >
      <head>
        <Script id="uw-theme-bootstrap" strategy="beforeInteractive">
          {THEME_BOOTSTRAP}
        </Script>
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
