
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'projects' | 'blogs'>('projects');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Form States
    const [projectForm, setProjectForm] = useState({
        title: '', slug: '', description: '', fullDescription: '', image: '', tags: '', link: '', repo: ''
    });
    const [blogForm, setBlogForm] = useState({
        title: '', slug: '', excerpt: '', content: '', image: '', tags: '', date: ''
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'project' | 'blog') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.success) {
                if (type === 'project') setProjectForm(prev => ({ ...prev, image: data.result.secure_url }));
                else setBlogForm(prev => ({ ...prev, image: data.result.secure_url }));
            }
        } catch (error) {
            console.error('Upload failed', error);
        } finally {
            setLoading(false);
        }
    };

    const submitProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...projectForm,
                    tags: projectForm.tags.split(',').map(t => t.trim())
                })
            });
            if (res.ok) alert('Project created!');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const submitBlog = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...blogForm,
                    tags: blogForm.tags.split(',').map(t => t.trim())
                })
            });
            if (res.ok) alert('Blog post created!');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/logout', { method: 'POST' });
            if (res.ok) {
                router.push('/admin');
            } else {
                alert('Logout failed.');
            }
        } catch (error) {
            console.error('Logout error:', error);
            alert('Logout failed due to network error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background pt-24 px-6 md:px-20">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                    <LogOut size={20} /> Logout
                </button>
            </div>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('projects')}
                    className={`px - 6 py - 2 rounded - full ${activeTab === 'projects' ? 'bg-primary text-white' : 'bg-card'} `}
                >
                    Projects
                </button>
                <button
                    onClick={() => setActiveTab('blogs')}
                    className={`px - 6 py - 2 rounded - full ${activeTab === 'blogs' ? 'bg-primary text-white' : 'bg-card'} `}
                >
                    Blogs
                </button>
            </div>

            {activeTab === 'projects' ? (
                <form onSubmit={submitProject} className="space-y-4 max-w-2xl">
                    <input type="text" placeholder="Title" className="w-full p-3 bg-card rounded" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} required />
                    <input type="text" placeholder="Slug" className="w-full p-3 bg-card rounded" value={projectForm.slug} onChange={e => setProjectForm({ ...projectForm, slug: e.target.value })} required />
                    <textarea placeholder="Short Description" className="w-full p-3 bg-card rounded" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required />
                    <textarea placeholder="Full Description" className="w-full p-3 bg-card rounded h-32" value={projectForm.fullDescription} onChange={e => setProjectForm({ ...projectForm, fullDescription: e.target.value })} required />
                    <input type="text" placeholder="Tags (comma separated)" className="w-full p-3 bg-card rounded" value={projectForm.tags} onChange={e => setProjectForm({ ...projectForm, tags: e.target.value })} />
                    <input type="text" placeholder="Live Link" className="w-full p-3 bg-card rounded" value={projectForm.link} onChange={e => setProjectForm({ ...projectForm, link: e.target.value })} />
                    <input type="text" placeholder="Repo Link" className="w-full p-3 bg-card rounded" value={projectForm.repo} onChange={e => setProjectForm({ ...projectForm, repo: e.target.value })} />

                    <div className="border border-dashed border-gray-600 p-6 rounded text-center">
                        <input type="file" onChange={e => handleImageUpload(e, 'project')} />
                        {projectForm.image && <p className="text-green-500 mt-2">Image Uploaded!</p>}
                    </div>

                    <button disabled={loading} className="bg-primary text-white px-8 py-3 rounded font-bold w-full">
                        {loading ? 'Processing...' : 'Create Project'}
                    </button>
                </form>
            ) : (
                <form onSubmit={submitBlog} className="space-y-4 max-w-2xl">
                    <input type="text" placeholder="Title" className="w-full p-3 bg-card rounded" value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} required />
                    <input type="text" placeholder="Slug" className="w-full p-3 bg-card rounded" value={blogForm.slug} onChange={e => setBlogForm({ ...blogForm, slug: e.target.value })} required />
                    <input type="date" className="w-full p-3 bg-card rounded" value={blogForm.date} onChange={e => setBlogForm({ ...blogForm, date: e.target.value })} required />
                    <textarea placeholder="Excerpt" className="w-full p-3 bg-card rounded" value={blogForm.excerpt} onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })} required />
                    <textarea placeholder="Content (Markdown)" className="w-full p-3 bg-card rounded h-64 font-mono" value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} required />
                    <input type="text" placeholder="Tags (comma separated)" className="w-full p-3 bg-card rounded" value={blogForm.tags} onChange={e => setBlogForm({ ...blogForm, tags: e.target.value })} />

                    <div className="border border-dashed border-gray-600 p-6 rounded text-center">
                        <input type="file" onChange={e => handleImageUpload(e, 'blog')} />
                        {blogForm.image && <p className="text-green-500 mt-2">Image Uploaded!</p>}
                    </div>

                    <button disabled={loading} className="bg-primary text-white px-8 py-3 rounded font-bold w-full">
                        {loading ? 'Processing...' : 'Create Blog Post'}
                    </button>
                </form>
            )}
        </main>
    );
}
