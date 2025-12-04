import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this blog post.'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: {
        type: String,
        required: [true, 'Please provide a slug for this blog post.'],
        unique: true,
    },
    excerpt: {
        type: String,
        required: [true, 'Please provide an excerpt for this blog post.'],
    },
    content: {
        type: String,
        required: [true, 'Please provide content for this blog post.'],
    },
    image: {
        type: String,
    },
    tags: {
        type: [String],
    },
    date: {
        type: String, // Storing as string YYYY-MM-DD for simplicity, or use Date
        required: true,
    },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
