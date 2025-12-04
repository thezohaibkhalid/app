"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-20">
                    {/* Left Side: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                            Let's Work Together
                        </h1>
                        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                            Have a project in mind? I'm always open to discussing new ideas, creative opportunities, or just having a chat about tech.
                        </p>

                        <div className="mb-12 bg-card/50 p-8 rounded-2xl border border-card-border">
                            <h2 className="text-2xl font-bold mb-4 text-white">About Me</h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                I'm Zohaib, a passionate Full Stack Developer based in London. I specialize in building high-performance web applications using the MERN stack and Next.js. With a keen eye for design and a love for clean code, I transform complex problems into elegant digital solutions.
                            </p>
                            <a href="/resume.pdf" download className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors border border-white/10">
                                Download CV
                            </a>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary border border-white/10">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Email</h3>
                                    <p className="text-lg font-medium">hello@zohaib.dev</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary border border-white/10">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Phone</h3>
                                    <p className="text-lg font-medium">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-primary border border-white/10">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Location</h3>
                                    <p className="text-lg font-medium">London, UK</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-card border border-card-border p-8 md:p-12 rounded-3xl"
                    >
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 font-medium ml-1">Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full p-4 bg-background border border-card-border rounded-xl focus:border-primary outline-none transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 font-medium ml-1">Email</label>
                                    <input type="email" placeholder="john@example.com" className="w-full p-4 bg-background border border-card-border rounded-xl focus:border-primary outline-none transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 font-medium ml-1">Subject</label>
                                <input type="text" placeholder="Project Inquiry" className="w-full p-4 bg-background border border-card-border rounded-xl focus:border-primary outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 font-medium ml-1">Message</label>
                                <textarea rows={6} placeholder="Tell me about your project..." className="w-full p-4 bg-background border border-card-border rounded-xl focus:border-primary outline-none transition-colors resize-none"></textarea>
                            </div>
                            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/25">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
