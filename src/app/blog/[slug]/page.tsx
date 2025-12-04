import { getPostData } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function Post({ params }: { params: { slug: string } }) {
    const postData = await getPostData(params.slug);

    return (
        <main className="min-h-screen bg-background pt-24 px-6 md:px-20 pb-20">
            <div className="max-w-3xl mx-auto">
                <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Blog
                </Link>

                <article className="prose prose-invert prose-lg max-w-none">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{postData.title}</h1>
                    <div className="text-secondary mb-8">{postData.date}</div>
                    {postData.image && (
                        <div className="w-full h-[400px] relative overflow-hidden rounded-2xl mb-10">
                            <img src={postData.image} alt={postData.title} className="object-cover w-full h-full" />
                        </div>
                    )}
                    <ReactMarkdown
                        components={{
                            img: ({ node, ...props }) => (
                                <span className="block my-8 rounded-xl overflow-hidden border border-card-border">
                                    <img {...props} className="w-full h-auto" />
                                </span>
                            )
                        }}
                    >
                        {postData.content}
                    </ReactMarkdown>
                </article>
            </div>
        </main>
    );
}
