import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this project.'],
        maxlength: [60, 'Title cannot be more than 60 characters'],
    },
    slug: {
        type: String,
        required: [true, 'Please provide a slug for this project.'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this project.'],
    },
    fullDescription: {
        type: String,
        required: [true, 'Please provide a full description for this project.'],
    },
    image: {
        type: String,
        required: [true, 'Please provide an image URL for this project.'],
    },
    gallery: {
        type: [String],
    },
    tags: {
        type: [String],
    },
    link: {
        type: String,
    },
    repo: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
