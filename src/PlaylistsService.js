const PGService = require('./PGService');

module.exports = class extends PGService {
    constructor() {
        super();
    }

    async getPlaylistById(id) {
        const result = await this._query({
            text: `SELECT playlists.id, playlists.name, users.username 
            FROM playlists 
            LEFT JOIN users ON users.id = playlists.owner 
            WHERE playlists.id = $1`,
            values: [id],
        });

        return result[0];
    }

    async getSongsPlaylistById(id) {
        return await this._query({
            text: `SELECT songs.id, songs.title, songs.performer 
            FROM songs 
            LEFT JOIN songs_playlists ON songs_playlists.song_id = songs.id 
            WHERE songs_playlists.playlist_id = $1`,
            values: [id],
            errWhenNoRows: false,
        });
    }
};
