import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Jacques_Francois, Lora } from 'next/font/google'
import Header from "@/components/header/header";
import Footer from "@/components/footer/Footer";

const jacquesFrancois = Jacques_Francois({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-jacques',
  display: 'swap',
})

const lora = Lora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "The Great World of Reelms"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${jacquesFrancois.variable} ${lora.variable}`}>
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}