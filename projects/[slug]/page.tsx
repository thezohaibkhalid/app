import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Calendar, Code2, User } from "lucide-react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { projects } from "@/lib/projects";

// Remove generateStaticParams for now as we are moving to dynamic DB content
// or we would need to fetch all slugs from DB

async function getProject(slug: string) {
    if (!process.env.MONGODB_URI) return projects.find(p => p.slug === slug) || null;
    try {
        await dbConnect();
        const project = await Project.findOne({ slug });
        if (!project) return projects.find(p => p.slug === slug) || null;
        return JSON.parse(JSON.stringify(project));
    } catch (e) {
        return projects.find(p => p.slug === slug) || null;
    }
}

export default async function ProjectDetails({ params }: { params: { slug: string } }) {
    const project = await getProject(params.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background pb-20">
            {/* Full Width Hero */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl mx-auto"
                    >
                        <Link href="/projects" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors group">
                            <ArrowLeft size={20} className="mr-2 transform group-hover:-translate-x-1 transition-transform" /> Back to Projects
                        </Link>
                        <h1 className="text-5xl md:text-8xl font-bold text-white mb-4 tracking-tight">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-3">
                            {project.tags.map((tag: string) => (
                                <span key={tag} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm text-white border border-white/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
                <div className="grid lg:grid-cols-3 gap-16">
                    {/* Sidebar / Metadata */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="sticky top-32 space-y-8"
                        >
                            <div>
                                <h3 className="text-gray-500 uppercase tracking-wider text-sm font-semibold mb-3 flex items-center gap-2">
                                    <User size={16} /> Role
                                </h3>
                                <p className="text-xl font-medium">Lead Developer & Designer</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 uppercase tracking-wider text-sm font-semibold mb-3 flex items-center gap-2">
                                    <Calendar size={16} /> Timeline
                                </h3>
                                <p className="text-xl font-medium">3 Months</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 uppercase tracking-wider text-sm font-semibold mb-3 flex items-center gap-2">
                                    <Code2 size={16} /> Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag: string) => (
                                        <span key={tag} className="text-gray-300">{tag},</span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 flex flex-col gap-4">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/80 transition-all hover:scale-[1.02] shadow-lg shadow-primary/25">
                                    <ExternalLink size={20} /> Live Demo
                                </a>
                                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all hover:scale-[1.02]">
                                    <Github size={20} /> Source Code
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <h2 className="text-3xl font-bold mb-6">Overview</h2>
                        <p className="text-xl text-gray-300 leading-relaxed whitespace-pre-line mb-12">
                            {project.fullDescription}
                        </p>

                        <h2 className="text-3xl font-bold mb-8">Gallery</h2>
                        {/* Bento Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[800px]">
                            {project.gallery.map((img: string, index: number) => (
                                <div
                                    key={index}
                                    className={`relative rounded-3xl overflow-hidden border border-card-border group ${index === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${project.title} screenshot ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
