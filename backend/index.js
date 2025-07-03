import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
const app = express();
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

app.get("/", (req, res) => {
    res.send("API Running Successfully");
})

// Middleware
app.use(cors({
  origin: 'https://smart-notes-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
