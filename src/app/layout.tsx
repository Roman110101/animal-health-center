import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import DebugToggle from "@/components/DebugToggle";
import Header from "@/components/Header/Header";
import { HeaderProvider } from "@/components/Header/HeaderContext";
import HeaderOverlay from "@/components/Header/HeaderOverlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Центр здоровья животных - Профессиональная ветеринарная помощь",
  description: "Современный ветеринарный центр с полным спектром услуг для ваших питомцев. Запись онлайн, опытные специалисты.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${geist.variable} font-sans antialiased w-full min-w-[320px] overflow-x-hidden`}
      >
        <HeaderProvider>
          <Header />
          <HeaderOverlay />
          {children}
          <DebugToggle />
        </HeaderProvider>
      </body>
    </html>
  );
}
