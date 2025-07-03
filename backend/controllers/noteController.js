import extractPdfText from '../utils/extractPdfText.js';
import summarizeText from '../utils/summarizeText.js';
import generateFlashcards from '../utils/generateFlashcards.js';
import Note from '../models/Note.js';

export const uploadAndSummarize = async (req, res) => {
    try {
        const userId = req.user.id;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const originalText = await extractPdfText(file.buffer);
        if (!originalText || originalText.trim().length === 0) {
            return res.status(400).json({ message: 'PDF is empty or unreadable' });
        }

        const summary = await summarizeText(originalText);
        const flashcards = await generateFlashcards(originalText);  // ✅ Now it returns valid array!

        const newNote = new Note({
            user: userId,
            originalText,
            summary,
            flashcards,  // ✅ Now it saves correctly!
        });

        await newNote.save();

        res.status(201).json(newNote);
    } catch (err) {
        console.error("Error summarizing note:", err.message);
        res.status(500).json({ message: 'Failed to process and save note' });
    }
  };
  

export const getAllNotes = async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (err) {
        console.error("Failed to fetch notes:", err.message);
        res.status(500).json({ message: "Failed to fetch notes" });
    }
};
  
export const deleteNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteId = req.params.id;

        const note = await Note.findOneAndDelete({ _id: noteId, user: userId });

        if (!note) {
            return res.status(404).json({ message: 'Note not found or unauthorized' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        console.error("Error deleting note:", err.message);
        res.status(500).json({ message: 'Failed to delete note' });
    }
  };