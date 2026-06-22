const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
            to: [to],
            subject,
            text,
            html,
        });

        if (error) {
            throw new Error(error.message || "Failed to send email via Resend");
        }

        return data;
    } catch (err) {
        console.error("Resend API Error:", err.message);
        throw err;
    }
};

module.exports = sendEmail;
