import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <main className="pt-24">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
