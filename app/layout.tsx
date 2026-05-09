import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  style: ["normal", "italic"]
});

export const metadata = {
  title: "Agency | Building Digital Foundations",
  description: "We build the kind of digital your competitors wish they had, and the kind your business needs to thrive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`bg-background ${inter.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
