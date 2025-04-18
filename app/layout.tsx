import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import localFont from "next/font/local";
import "./globals.css";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']})

export const metadata: Metadata = {
  title: "Ago Shopping",
  description: "Do modern shopping the right way!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
      >
        {children}
      </body>
    </html>
  );
}
