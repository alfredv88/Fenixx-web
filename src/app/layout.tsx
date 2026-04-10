import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fenixx Import Export",
  description: "Fenixx Import Export C.A - Centro Intermodal y Operador Logístico Integral. Expertos en gestión aduanera, transporte multimodal y logística de carga especializada.",
  keywords: "logistica, aduanas, transporte multimodal, fenixx import, centro intermodal, carga especializada, importacion exportacion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* Google Fonts: Work Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Work_Sans',sans-serif]">
        {children}
      </body>
    </html>
  );
}
