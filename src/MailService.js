const nodemailer = require('nodemailer');

module.exports = class {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendEmail(targetEmail, content) {
        const message = {
            from: 'Open Music API',
            to: targetEmail,
            subject: 'Ekspor Playlist',
            text: 'Terlampir hasil dari ekspor playlist',
            attachments: [
                {
                    filename: 'playlists.json',
                    content,
                },
            ],
        };

        await this._transporter.sendMail(message);
    }
};
