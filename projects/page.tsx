import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import ProjectsList from "@/components/ProjectsList";
import { projects } from "@/lib/projects";

export const dynamic = 'force-dynamic';

async function getProjects() {
    if (!process.env.MONGODB_URI) return projects;
    try {
        await dbConnect();
        const dbProjects = await Project.find({}).sort({ createdAt: -1 });
        if (dbProjects.length === 0) return projects;
        return JSON.parse(JSON.stringify(dbProjects));
    } catch (e) {
        console.error(e);
        return projects;
    }
}

export default async function Projects() {
    const projects = await getProjects();
    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        Selected Work
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                        A collection of projects that showcase my passion for design and development.
                    </p>
                </div>

                <ProjectsList projects={projects} />
            </div>
        </main>
    );
}
