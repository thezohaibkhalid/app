"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
    id: string;
    date: string;
    title: string;
    excerpt?: string;
    image?: string;
    tags?: string[];
}

export default function BlogList({ posts }: { posts: Post[] }) {
    const [selectedTag, setSelectedTag] = useState<string>("All");

    // Extract all unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>(["All"]);
        posts.forEach(post => {
            post.tags?.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }, [posts]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        if (selectedTag === "All") return posts;
        return posts.filter(post => post.tags?.includes(selectedTag));
    }, [posts, selectedTag]);

    return (
        <div>
            {/* Filter Bar */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedTag === tag
                                ? "bg-primary text-white shadow-lg shadow-primary/25"
                                : "bg-card border border-card-border text-gray-400 hover:border-primary hover:text-white"
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Posts Grid */}
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredPosts.map((post) => (
                        <motion.div
                            layout
                            key={post.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link href={`/blog/${post.id}`} className="group block h-full">
                                <article className="bg-card border border-card-border rounded-2xl overflow-hidden hover:border-primary transition-all duration-300 h-full flex flex-col hover:shadow-2xl hover:shadow-primary/10">
                                    {post.image && (
                                        <div className="relative h-56 w-full overflow-hidden">
                                            <img src={post.image} alt={post.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    )}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm text-secondary">{post.date}</span>
                                        </div>
                                        <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                                        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {post.tags?.map(tag => (
                                                <span key={tag} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300 border border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredPosts.length === 0 && (
                <div className="text-center text-gray-500 py-20">
                    No posts found for this tag.
                </div>
            )}
        </div>
    );
}
