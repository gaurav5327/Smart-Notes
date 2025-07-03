import axios from 'axios';

const getEmbedding = async (text) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/embeddings',
            {
                model: 'text-embedding-ada-002',
                input: text,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        return response.data.data[0].embedding;
    } catch (error) {
        console.error('Embedding error:', error.response?.data || error.message);
        throw new Error('Failed to generate embedding');
    }
};

export default getEmbedding;