require('dotenv').config();
const amqp = require('amqplib');
const MailSender = require('./src/MailService');
const Listener = require('./src/Listener');
const PlaylistsService = require('./src/PlaylistsService');

const init = async () => {
    const playlistsService = new PlaylistsService();
    const mailSender = new MailSender();
    const listener = new Listener(playlistsService, mailSender);

    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue('export:playlists', {
        durable: true,
    });

    channel.consume('export:playlists', listener.listen, {noAck: true});
};

init();

