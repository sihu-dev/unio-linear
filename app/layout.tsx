import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNIO - 협동로봇 AI 플랫폼",
  description: "스마트공장 Pool 2,460개사를 위한 협동로봇 AI 플랫폼. 72시간 → 30분, AI가 로봇을 프로그래밍합니다.",
  keywords: ["협동로봇", "AI", "스마트공장", "Pool", "자동화", "로봇 프로그래밍"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
