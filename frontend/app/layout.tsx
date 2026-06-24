// Global wrapper around entire app

import type { Metadata } from "next"
import { Toaster } from "sonner"

import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google"

import "./globals.css"

import { cn } from "@/lib/utils"

import AuthProvider from "@/components/providers/AuthProvider"
import WebsocketProvider from "@/components/providers/WebsocketProvider"

import Navbar from "@/components/layout/Navbar"


const jetbrainsMono = JetBrains_Mono({
    subsets:['latin'],
    variable:'--font-mono'
})

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})


export const metadata: Metadata = {
    title: "Meeting Summarizer",
    description: "AI-powered meeting summarizer with action extraction and execution",
}


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <html
            lang="en"
            className={cn(
                "h-full", 
                "antialiased", 
                geistSans.variable, 
                geistMono.variable, 
                jetbrainsMono.variable,
                "font-mono"
            )}
        >

            <body className="min-h-full bg-background text-foreground">
                
                <AuthProvider>

                    <WebsocketProvider>

                        <div className="flex min-h-screen flex-col">

                            <Navbar />

                            <main className="flex-1">

                                {children}

                            </main>

                            <Toaster richColors position="top-right" />

                        </div>

                    </WebsocketProvider>
                    
                </AuthProvider>
                
            </body>
        
        </html>
    )
}
