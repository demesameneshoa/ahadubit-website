import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";

// Brand face (from the company profile) for headlines only; body copy uses the
// visitor's system font, which is tuned for legibility at small sizes.
// Self-hosted (Latin subset, SIL Open Font License — see ./fonts/OFL.txt) so
// builds never depend on fetching from Google Fonts.
const display = localFont({
  src: [
    { path: "./fonts/Montserrat-SemiBold.woff", weight: "600", style: "normal" },
    { path: "./fonts/Montserrat-Bold.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-brand",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahadubit.com"),
  title: {
    default: "Ahadubit Technologies PLC — Solutions for Tomorrow",
    template: "%s | Ahadubit Technologies",
  },
  description:
    "Ahadubit Technologies PLC is an Addis Ababa technology company delivering Odoo ERP, custom web and mobile apps, cloud, networking, surveillance, hardware integration and financial solutions across Ethiopia.",
  keywords: [
    "Ahadubit",
    "Ethiopia ERP",
    "Odoo Ethiopia",
    "software company Addis Ababa",
    "custom app development Ethiopia",
    "surveillance systems Ethiopia",
    "HRM system Ethiopia",
  ],
  openGraph: {
    title: "Ahadubit Technologies PLC — Solutions for Tomorrow",
    description: "ERP, custom software, cloud, networking and hardware integration for Ethiopian organizations.",
    url: "https://ahadubit.com",
    siteName: "Ahadubit Technologies",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0d22" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <span id="top" aria-hidden="true" />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <a href="#top" className="to-top" aria-label="Back to top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </a>
        <ScrollEffects />
      </body>
    </html>
  );
}
