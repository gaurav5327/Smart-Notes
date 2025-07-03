import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const summarizeText = async (text) => {
    const prompt = `Summarize the following content into clear, concise study notes:\n\n${text}`;

    const response = await groq.chat.completions.create({
        model: 'llama3-70b-8192', // ✅ Groq-recommended current model
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
    });

    return response.choices[0].message.content.trim();
};

export default summarizeText;
