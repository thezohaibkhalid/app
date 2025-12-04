"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="h-[90vh] flex flex-col justify-center px-6 md:px-20 relative overflow-hidden">
            <div className="max-w-4xl z-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-secondary font-semibold text-lg md:text-xl block mb-4"
                >
                    Hello, I&apos;m
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent"
                >
                    Zohaib Khalid
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl md:text-5xl font-bold text-primary mb-8"
                >
                    Web Developer & Student
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10"
                >
                    I build pixel-perfect, engaging, and accessible digital experiences.
                    Currently working and studying, balancing code and life.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-4"
                >
                    <Link href="/projects" className="bg-accent-gradient text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1">
                        View Work
                    </Link>
                    <Link href="#contact" className="border-2 border-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/10 transition-all duration-300 transform hover:-translate-y-1">
                        Contact Me
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-6 mt-12"
                >
                    <a href="https://github.com/thezohaibkhalid" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                        <Github size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                        <Linkedin size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                        <Twitter size={24} />
                    </a>
                </motion.div>
            </div>

            {/* Background Blob */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse" />
        </section>
    );
}
