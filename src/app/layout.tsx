import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "@/context/auth-context";
import { ToastContainer } from "react-toastify";

const montserrat = Montserrat({
  variable: "--montserrat",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Pet Adopt",
  description: "Adote um pet e mude a faça-o feliz!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <AuthProvider>
          <ToastContainer />
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
