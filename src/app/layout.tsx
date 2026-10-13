import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";

// Brand face (from the company profile) for headlines only; body copy uses the
// visitor's system font, which is tuned for legibility at small sizes.
const display = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-brand",
  display: "swap",
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
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollEffects />
      </body>
    </html>
  );
}
