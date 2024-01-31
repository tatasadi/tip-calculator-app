import type { Metadata } from "next"
import { Space_Mono } from "next/font/google"
import "./globals.css"

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["700"] })

export const metadata: Metadata = {
  title: "Frontend Mentor Challenge",
  description: "A Challenge from Frontend Mentor!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/images/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
      </head>
      <body
        className={`${spaceMono.className} bg-neutral-light-grayish-cyan flex min-h-screen flex-col items-center justify-center`}
      >
        {children}
      </body>
    </html>
  )
}
