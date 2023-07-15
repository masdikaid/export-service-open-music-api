const {Pool} = require('pg');

module.exports = class {
    constructor() {
        this._pool = new Pool();
    }

    async _query({
        text,
        values,
        errWhenNoRows = true,
    }) {
        const results = await this._pool.query({
            text,
            values,
        });
        if (!results.rows.length && errWhenNoRows) {
            throw new Error(
                Date.now().toString() + ' || ' + text + ' || ' + values);
        }

        return results.rows;
    }
};
