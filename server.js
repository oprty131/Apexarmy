require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const webhookURL = process.env.WEBHOOK; // Use the webhook URL from the environment variable

app.post('/send-robux-request', (req, res) => {
    const { username } = req.body;
    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: `User requested Robux: ${username}` }),
    })
    .then(response => {
        if (response.ok) {
            res.status(200).send('Request sent successfully.');
        } else {
            res.status(500).send('Error sending request.');
        }
    })
    .catch(err => {
        res.status(500).send('Error sending request.');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
