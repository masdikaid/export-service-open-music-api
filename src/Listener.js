module.exports = class {
    constructor(PlaylistsService, MailSender) {
        this._playlistsService = PlaylistsService;
        this._mailSender = MailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const {playlistId: id, targetEmail} = JSON.parse(
                message.content.toString(),
            );

            const playlist = await this._playlistsService.getPlaylistById(id);
            playlist.songs = await this._playlistsService.getSongsPlaylistById(id);

            await this._mailSender.sendEmail(
                targetEmail,
                JSON.stringify({playlist}),
            );

        } catch (error) {
            console.error(error);
        }
    }
};
