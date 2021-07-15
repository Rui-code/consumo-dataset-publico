const publicDataset = require('./dataset');
const fs = require('fs/promises');
const path = require('path');

const dskController = {

    index: async (req, res) => {
        let data = '';

        try {
            console.log('Removendo arquivo...');
            await fs.unlink('./dsk_indica_obras.json');
        } catch (error) {
            console.log('Arquivo não existe.');
        }

        try {
            data = String(await publicDataset.getDataset("dsk_indica_obras", [], [], []));
        } catch (error) {
            console.log(`Erro ao buscar os dados.`);
        }

        try {
            await fs.writeFile('dsk_indica_obras.json', data);
            console.log('Salvo!');
        } catch (error) {
            console.log(`Ocorreu algum erro ao salvar o arquivo: ${error}.`);
        }
        
        return res.format({
            'application/json': () => res.download(path.join(__dirname, 'dsk_indica_obras.json'))
        });
    }
}

module.exports = dskController;