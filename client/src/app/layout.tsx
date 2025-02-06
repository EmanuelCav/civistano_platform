import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Loading from "@/components/general/Loading";

import StoreProvider from "./storeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Civistano - Tu guía para la ciudadanía italian",
  description: "Facilitamos el proceso para obtener tu ciudadanía italiana de forma rápida y detallada. Tu guía sencilla para gestionar y tramitar la ciudadanía italiana para descendientes, via paterna y materna sin necesitad de viajar a Italia",
  openGraph: {
    title: "Civistano",
    description: "Tu guía para la ciudadanía italiana",
    url: "https://civistano.com",
    siteName: "Civistano",
    images: [
      {
        url: "https://civistano.com/civistano.png",
        alt: "Civistano - Ciudadanía Italiana",
      },
    ],

    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Civistano",
    description: "Facilitamos el proceso para obtener tu ciudadanía italiana de forma rápida y detallada.",
    images: ["https://civistano.com/civistano.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://civistano.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ToastContainer limit={1} />
          <Loading />
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
