import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "LetsRunPark",
  description: "렛츠런파크 경마 정보 + 유력마 추천",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="font-[Pretendard] bg-gray-50 text-gray-900 antialiased">
        <Providers>
          <main className="min-h-dvh max-w-lg mx-auto px-4 py-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
