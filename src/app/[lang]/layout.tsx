import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import fs from "fs";
import path from "path";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["vietnamese", "latin"],
});

// ─── Load settings từ file (chỉ chạy trên server) ───────────
function getSettings() {
  try {
    const filePath = path.join(process.cwd(), "src/i18n/settings.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as {
      google_tag_manager: string;
      google_search_console: string;
      site_url: string;
    };
  } catch {
    return { google_tag_manager: "", google_search_console: "", site_url: "https://alexanhphan.com" };
  }
}

// ─── Metadata (đọc settings để inject GSC) ───────────────────
export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();

  return {
    metadataBase: new URL(settings.site_url || "https://alexanhphan.com"),
    title: "Alex Anh Phan | Growth Strategist & Marketing Automator",
    description: "I help businesses achieve breakthrough growth through data strategy, marketing automation, and applied AI solutions.",
    keywords: "Alex Anh Phan, Growth Hacker, Marketing Director, CMO, AI Automation, EdTech, B2B Marketing",
    authors: [{ name: "Alex Anh Phan" }],
    // ✅ Google Search Console – điền trong Admin > Settings
    ...(settings.google_search_console && {
      verification: {
        google: settings.google_search_console,
      },
    }),
    openGraph: {
      title: "Alex Anh Phan | Portfolio",
      description: "Data-driven Growth Strategist & Marketing Automator.",
      url: settings.site_url || "https://alexanhphan.com",
      siteName: "Alex Anh Phan Portfolio",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Alex Anh Phan Portfolio",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "vi" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const settings = getSettings();
  const gtmId = settings.google_tag_manager?.trim();

  return (
    <html
      lang={lang}
      className={`${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-50">
        {/* ✅ Google Tag Manager – NoScript (phải đứng đầu body) */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {children}

        {/* ✅ Google Tag Manager – Script (afterInteractive = sau khi trang load) */}
        {gtmId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');
              `.trim(),
            }}
          />
        )}
      </body>
    </html>
  );
}
