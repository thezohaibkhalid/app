import { Github, Star, GitFork, Book } from "lucide-react";

async function getRepos() {
    const res = await fetch("https://api.github.com/users/thezohaibkhalid/repos?sort=updated&per_page=12", {
        next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function GithubPage() {
    const repos = await getRepos();

    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        Open Source
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                        Exploring code, building tools, and contributing to the community.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repos.map((repo: any) => (
                        <a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-card border border-card-border p-6 rounded-2xl hover:border-primary transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-white/5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Book size={24} />
                                </div>
                                <div className="flex items-center gap-4 text-gray-400 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Star size={16} />
                                        <span>{repo.stargazers_count}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GitFork size={16} />
                                        <span>{repo.forks_count}</span>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{repo.name}</h2>
                            <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                                {repo.description || "No description available."}
                            </p>

                            <div className="flex items-center gap-2 mt-auto">
                                {repo.language && (
                                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">
                                        {repo.language}
                                    </span>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </main>
    );
}
