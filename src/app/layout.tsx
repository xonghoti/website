import { ThemeProvider } from "@/lib/ThemeContext";
import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en" className={inter.className}>
            <body className="bg-background text-foreground">
                <ThemeProvider>
                <header className="sticky top-0 z-50 bg-background border-b border-border">
                    <div className="container flex items-center h-16">
                        <Navbar />
                    </div>
                </header>

                <main className="flex-1 container py-12">
                    {children}
                </main>

                <footer className="bg-background border-t border-border py-6">
                    <div className="container text-center text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Rikto Xonghoti. All rights reserved.
                    </div>
                </footer>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
