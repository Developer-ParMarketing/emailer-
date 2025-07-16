const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST requests allowed' });
    }

    const { code } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'info@parmarketing.agency',
            pass: 'yzqtpocumbafxgbt' // App password
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
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
