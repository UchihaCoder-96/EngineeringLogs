import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://engineeringlogs.com"),

    title: {
        default: "Engineering Logs",
        template: "%s | Engineering Logs",
    },

    description:
        "Engineering projects, development journals and technical articles documenting my engineering journey.",

    keywords: [
        "engineering",
        "robotics",
        "programming",
        "game development",
        "electronics",
        "portfolio",
        "engineering logs",
    ],

    authors: [
        {
            name: "Uwuchiha san",
        },
    ],

    creator: "Uwuchiha san",

    applicationName: "Engineering Logs",

    openGraph: {
        type: "website",
        siteName: "Engineering Logs",
        title: "Engineering Logs",
        description:
            "Engineering projects and development journals.",
        images: [
            "/og-image.png",
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Engineering Logs",
        description:
            "Engineering projects and journals.",
        images: ["/og-image.png"],
    },

    robots: {
        index: true,
        follow: true,
    },
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        <main>
            {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
