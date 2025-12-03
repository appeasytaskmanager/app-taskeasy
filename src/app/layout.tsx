import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/app/components/view/dashboard";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaskEasy - Gerenciador de Tarefas",
  description: "Aplicação moderna para gerenciamento de tarefas e produtividade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
