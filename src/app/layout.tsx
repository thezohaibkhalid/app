import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";

const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
    title: "Zohaib Khalid | Web Developer",
    description: "Portfolio of Zohaib Khalid, a 21-year-old Web Developer, Student, and Worker.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={outfit.className}>
                <CustomCursor />
                <Navbar />
                {children}
            </body>
        </html>
    );
}
