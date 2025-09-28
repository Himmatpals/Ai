require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
        const response = await fetch(`https://api-inference.huggingface.co/models/${process.env.MODEL_ID}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HF_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: req.body.message, parameters: { max_new_tokens: 200, temperature: 0.7, return_full_text: false } })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Failed to fetch AI response' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
