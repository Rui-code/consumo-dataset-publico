const publicDataset = require('./dataset');
const fs = require('fs');
const path = require('path');

const dskController = {

    index: async (req, res) => {
        fs.unlink('./dsk_indica_obras.json', () => {});
        await publicDataset.getDataset("dsk_indica_obras", [], [], []).catch((e) => {});
        return res.format({
            'application/json': () => res.download(path.join(__dirname, 'dsk_indica_obras.json')),
        });
    }
}

module.exports = dskController;