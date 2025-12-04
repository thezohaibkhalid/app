import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import GithubGraph from "@/components/GithubGraph";
import { Github, Linkedin, Twitter, Code, Palette, Search, ArrowRight } from "lucide-react";
import { getSortedPostsData } from "@/lib/posts";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { projects } from "@/lib/projects";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";

export const dynamic = 'force-dynamic';

const services = [
    {
        icon: <Code size={32} />,
        title: "Web Development",
        description: "Building fast, responsive, and scalable websites using modern technologies like Next.js and React."
    },
    {
        icon: <Palette size={32} />,
        title: "UI/UX Design",
        description: "Creating intuitive and visually stunning interfaces that provide an exceptional user experience."
    },
    {
        icon: <Search size={32} />,
        title: "SEO Optimization",
        description: "Optimizing your digital presence to rank higher on search engines and reach your target audience."
    }
];

async function getFeaturedProjects() {
    // return projects.slice(0, 2);
    if (!process.env.MONGODB_URI) return projects.slice(0, 2);
    try {
        await dbConnect();
        const dbProjects = await Project.find({}).limit(2).sort({ createdAt: -1 });
        if (dbProjects.length === 0) return projects.slice(0, 2);
        return JSON.parse(JSON.stringify(dbProjects));
    } catch (e) {
        return projects.slice(0, 2);
    }
}

// Mock recent posts for the client component (in a real app, pass this as prop)
const recentPosts = [
    {
        id: "hello-world",
        title: "Building a Portfolio with Next.js",
        date: "2025-12-04",
        excerpt: "How I migrated my static HTML portfolio to a dynamic Next.js application...",
        image: "/images/mbh.png",
        tags: ["Next.js", "Dev"]
    }
];

export default async function Home() {
    const featuredProjects = await getFeaturedProjects();
    return (
        <main className="min-h-screen pt-16">
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <FeaturedProjectsSection projects={featuredProjects} />

            {/* GitHub Graph Section */}
            <section className="py-20 px-6 md:px-20 bg-card/10">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">GitHub Activity</h2>
                <GithubGraph />
            </section>

            {/* Recent Blogs Section */}
            <section className="py-20 px-6 md:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">Recent Thoughts</h2>
                        <Link href="/blog" className="text-primary hover:text-white flex items-center gap-2 transition-colors">
                            View All <ArrowRight size={20} />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {recentPosts.map((post, index) => (
                            <Link key={index} href={`/blog/${post.id}`} className="group">
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-card border border-card-border rounded-2xl overflow-hidden hover:border-primary transition-all duration-300 h-full flex flex-col"
                                >
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <img src={post.image} alt={post.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-sm text-secondary mb-2">{post.date}</div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                                        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">{post.excerpt}</p>
                                        <div className="flex gap-2">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-6 md:px-20 bg-card/10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
                    <p className="text-gray-400 mb-10">Have a project in mind or just want to say hi? Feel free to drop a message!</p>
                    <form className="space-y-6 text-left">
                        <div className="grid md:grid-cols-2 gap-6">
                            <input type="text" placeholder="Name" className="w-full p-4 bg-card border border-card-border rounded-lg focus:border-primary outline-none transition-colors" />
                            <input type="email" placeholder="Email" className="w-full p-4 bg-card border border-card-border rounded-lg focus:border-primary outline-none transition-colors" />
                        </div>
                        <textarea rows={5} placeholder="Message" className="w-full p-4 bg-card border border-card-border rounded-lg focus:border-primary outline-none transition-colors"></textarea>
                        <button className="w-full bg-accent-gradient text-white py-4 rounded-lg font-bold hover:opacity-90 transition-opacity">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
