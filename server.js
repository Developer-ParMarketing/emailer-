// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-code', async (req, res) => {
    const { code } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'info@parmarketing.agency',
            pass: 'yzqtpocumbafxgbt' 
        }
    });

    const mailOptions = {
        from: 'info@parmarketing.agency',
        to: 'info@parmarketing.agency',
        subject: 'Code Challenge Submission',
        text: `Submitted Code:\n\n${code}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
