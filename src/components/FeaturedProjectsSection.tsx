"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjectsSection({ projects }: { projects: any[] }) {
    return (
        <section className="py-20 px-6 md:px-20 bg-card/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
                    <Link href="/projects" className="text-primary hover:text-white flex items-center gap-2 transition-colors">
                        View All <ArrowRight size={20} />
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project: any, index: number) => (
                        <motion.div
                            key={project._id || project.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-[400px] rounded-2xl overflow-hidden border border-card-border"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">{project.description}</p>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    {project.tags.slice(0, 3).map((tag: string) => (
                                        <span key={tag} className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <Link href={`/projects/${project.slug}`} className="absolute inset-0" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
