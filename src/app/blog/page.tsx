import Link from 'next/link';
import { useState } from 'react';

// We need to pass data from a server component wrapper or fetch it here.
// For simplicity in this iteration, I'll mock the data fetching or assume it's passed as props if I refactor.
// However, since `getSortedPostsData` is node-only, we must use a Server Component for the page and a Client Component for the list.

// Let's create a Client Component for the Blog List
import BlogList from '@/components/BlogList';
import { getSortedPostsData } from '@/lib/posts';

// This is the Server Component
export default function Blog() {
    const allPostsData = getSortedPostsData();

    return (
        <main className="min-h-screen bg-background pt-24 px-6 md:px-20">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        Thoughts & Insights
                    </h1>
                    <p className="text-gray-400 text-xl">
                        Articles on web development, design, and technology.
                    </p>
                </div>

                <BlogList posts={allPostsData} />
            </div>
        </main>
    );
}
