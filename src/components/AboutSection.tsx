"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section className="py-20 px-6 md:px-20 bg-card/10">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
                    <p className="text-gray-400 mb-6">
                        I&apos;m a 21-year-old passionate Web Developer. Currently balancing my life as a student and a working professional, I thrive on turning complex problems into simple, beautiful, and intuitive designs.
                    </p>
                    <div className="grid grid-cols-3 gap-8">
                        <div>
                            <span className="block text-4xl font-bold text-secondary">21</span>
                            <span className="text-sm text-gray-500">Years Old</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-bold text-secondary">Student</span>
                            <span className="text-sm text-gray-500">Status</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-bold text-secondary">Working</span>
                            <span className="text-sm text-gray-500">Role</span>
                        </div>
                    </div>
                </div>
                <div className="bg-card border border-card-border p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-3">
                        {["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Git", "Framer Motion"].map((tech) => (
                            <span key={tech} className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10 hover:border-primary transition-colors">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
