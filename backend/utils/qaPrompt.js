import axios from 'axios';

const generateQAFromNote = async (summary) => {
    const prompt = `
Based on the following summarized notes, generate 5 question-answer pairs that can help students in self-assessment:

"${summary}"

Format:
Q1: ...
A1: ...
Q2: ...
A2: ...
`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 700,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Q&A generation error:', error.response?.data || error.message);
        throw new Error('Failed to generate Q&A from notes');
    }
};

export default generateQAFromNote;