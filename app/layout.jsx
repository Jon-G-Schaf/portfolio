import "./globals.css";
import { Inter, Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/content";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    site.url.startsWith("https://[") ? "http://localhost:3000" : site.url
  ),
  title: {
    default: site.title,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="grain font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-panel focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
