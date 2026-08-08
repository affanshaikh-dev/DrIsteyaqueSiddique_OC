import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";

const fontHeading = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontBody = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Isteyaque Siddique | Premium Orthopedic Clinic",
  description: "Advanced orthopedic care, joint replacement surgeries, and personalized rehabilitation. Book your consultation with Dr. Isteyaque today.",
  keywords: ["Orthopedic Surgeon", "Joint Replacement", "Knee Surgery", "Hip Surgery", "Arthroscopy"],
  icons: {
    icon: "/otherpedic_clinic_favicon.png",
    apple: "/otherpedic_clinic_favicon.png",
  },
  openGraph: {
    title: "Dr. Isteyaque Siddique | Orthopedic Clinic",
    description: "Experience world-class orthopedic treatments and minimally invasive surgeries for a pain-free life.",
    type: "website",
    locale: "en_US",
    siteName: "Dr. Isteyaque Orthopedic Clinic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Isteyaque Siddique | Premium Orthopedic Clinic",
    description: "Advanced orthopedic care, joint replacement surgeries, and personalized rehabilitation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontBody.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
