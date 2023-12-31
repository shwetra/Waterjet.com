const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = 8080;

// Twilio credentials
const accountSid = 'ACb99933292164213cc32b7e6eec3f621f';
const authToken = 'ed748e7e005fe46ba24dcc8c46a923df';
const twilioPhoneNumber = '+16152660233';

// Use the cors middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data

app.post('/send-sms', (req, res) => {
    const { name, number, email, message } = req.body;

    // Log the received data to the console
    console.log('Received Data:', req.body);

    const smsBody = `Name: ${name}\nNumber:${number}\nEmail: ${email}\nMessage: ${message}`;

    const client = twilio(accountSid, authToken);

    client.messages
        .create({
            body: smsBody,
            from: twilioPhoneNumber,
            to: '+918287825720'
        })
        .then(message => {
            console.log(`Message sent with SID: ${message.sid}`);
            res.json({ success: true, message: 'Message sent successfully' });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to send message' });
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
