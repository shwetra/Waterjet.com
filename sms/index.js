const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT;

// Use the cors middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data

app.post('/send-sms', (req, res) => {
    try {
        const { name, number, email, message } = req.body;

        // Log the received data to the console
        console.log('Received Data:', req.body);

        // Validate that required fields are present
        if (!name || !number || !email || !message) {
            throw new Error('Incomplete data received');
        }

        const smsBody = `Name: ${name}\nNumber:${number}\nEmail: ${email}\nMessage: ${message}`;

        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        client.messages
            .create({
                body: smsBody,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: '+918527415389'
            })
            .then(message => {
                console.log(`Message sent with SID: ${message.sid}`);
                res.json({ success: true, message: 'Message sent successfully' });
            })
            .catch(error => {
                console.error('Twilio Error:', error);
                res.status(500).json({ success: false, message: 'Failed to send message' });
            });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
