import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNIO - Linear Design",
  description: "Linear 디자인 시스템으로 구축된 UNIO 랜딩 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
