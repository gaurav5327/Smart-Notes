import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const generateFlashcards = async (text) => {
    const prompt = `
Generate exactly 5 flashcards from the following text.
Respond ONLY with valid JSON array (no explanation, no extra text).
Each flashcard must have:
- "question": The question.
- "answer": The answer.

Here is the text:
${text}

Your response format:
[
  { "question": "Question 1?", "answer": "Answer 1" },
  { "question": "Question 2?", "answer": "Answer 2" }
]
`;

    const response = await groq.chat.completions.create({
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
    });

    const content = response.choices[0].message.content.trim();

    try {
        const flashcards = JSON.parse(content);
        return flashcards;
    } catch (err) {
        console.error("Failed to parse JSON from Groq:", err.message);
        throw new Error("Failed to generate valid flashcards JSON");
    }
};

export default generateFlashcards;
