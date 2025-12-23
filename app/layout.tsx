import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weihnachts-Schnitzeljagd",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-[#08120D] text-[#F7F3E8]">
        {children}
      </body>
    </html>
  );
}
