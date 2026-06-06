import type { Metadata } from "next";
import "../globals.css";
import { Be_Vietnam_Pro } from "next/font/google";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["vietnamese", "latin"],
});

export const metadata: Metadata = {
  title: "CMS Admin – Alex Anh Phan Portfolio",
  description: "Content Management Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={beVietnamPro.variable}>
      <body className="min-h-screen bg-[#0f1117] text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
