import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CynoIA : Expérience Immersive WebGL & Architecture Cloud",
  description:
    "Landing page futuriste pour la startup SaaS CynoIA, exploitant des géométries paramétriques 3D et une infrastructure Serverless sur Oracle Cloud.",
  keywords: [
    "CynoIA",
    "WebGL",
    "React Three Fiber",
    "Next.js",
    "GSAP",
    "3D Animation",
    "Perlin Noise",
    "Oracle Cloud",
    "Serverless",
    "SaaS",
    "Intelligence Artificielle",
    "Afrique",
    "Africa",
    "Frontend Engineering",
    "Tailwind CSS",
  ],
  authors: [{ name: "CynoIA" }],
  creator: "CynoIA",
  openGraph: {
    title: "CynoIA : Expérience Immersive WebGL & Architecture Cloud",
    description:
      "Landing page futuriste pour la startup SaaS CynoIA, exploitant des géométries paramétriques 3D et une infrastructure Serverless sur Oracle Cloud.",
    type: "website",
    locale: "fr_FR",
    siteName: "CynoIA",
  },
  twitter: {
    card: "summary_large_image",
    title: "CynoIA : Expérience Immersive WebGL & Architecture Cloud",
    description:
      "Landing page futuriste pour la startup SaaS CynoIA, exploitant des géométries paramétriques 3D et une infrastructure Serverless sur Oracle Cloud.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${syne.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
