"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

interface Project {
    _id?: string;
    id?: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    tags: string[];
    link?: string;
}

function ProjectItem({ project, index }: { project: Project; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"],
    });
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    return (
        <motion.div
            ref={ref}
            style={{
                scale: scaleProgress,
                opacity: opacityProgress,
            }}
            className="sticky top-24 min-h-[80vh] bg-[#0a0a0a] border border-card-border rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl z-0"
        >
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
                <div className="mb-6">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="inline-block bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-gray-300 mr-2 mb-2">
                            {tag}
                        </span>
                    ))}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">{project.title}</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    {project.description}
                </p>
                <div className="flex gap-4">
                    <Link href={`/projects/${project.slug}`} className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
                        View Project
                    </Link>
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="border border-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-transparent md:via-[#0a0a0a]/50" />
            </div>
        </motion.div>
    );
}

export default function ProjectsList({ projects }: { projects: Project[] }) {
    return (
        <div className="flex flex-col gap-24 relative">
            {projects.map((project, index) => (
                <ProjectItem key={project._id || project.id || index} project={project} index={index} />
            ))}
        </div>
    );
}
