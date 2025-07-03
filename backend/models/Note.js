import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    originalText: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    flashcards: [
        {
            question: String,
            answer: String,
        },
    ],
    vector: {
        type: [Number], // Embedding vector
        default: [],
    },
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);