"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCron = void 0;
const axios_1 = __importDefault(require("axios"));
const zlib_1 = __importDefault(require("zlib"));
const JSONStream_1 = __importDefault(require("JSONStream"));
const stream_1 = require("stream");
const node_cron_1 = __importDefault(require("node-cron"));
const db_1 = require("./db"); // Substitua pela sua função de conexão
const dbName = 'OpenFood';
async function importData(filename) {
    try {
        // Baixar o arquivo JSON compactado do Open Food Facts
        const dataUrl = `https://challenges.coode.sh/food/data/json/${filename}`;
        const dataResponse = await axios_1.default.get(dataUrl, { responseType: 'arraybuffer' });
        // Descompactar o arquivo usando a biblioteca zlib
        const decompressedData = zlib_1.default.unzipSync(dataResponse.data);
        // Criar um stream de leitura do buffer descompactado
        const readableStream = new stream_1.Readable();
        readableStream.push(decompressedData);
        readableStream.push(null);
        // Usar o JSONStream para processar o stream em chunks
        const jsonStream = readableStream.pipe(JSONStream_1.default.parse('*'));
        // Conectar ao MongoDB usando a função de conexão do seu código
        const client = await (0, db_1.connectDB)();
        // Inserir produtos no MongoDB diretamente a partir do stream
        const productsCollection = client.db(dbName).collection('produtos');
        jsonStream.on('data', async (product) => {
            // Adicionar os campos personalizados aos produtos
            const imported_t = new Date();
            const status = 'published';
            const productWithFields = Object.assign(Object.assign({}, product), { imported_t,
                status });
            // Inserir o produto na coleção
            await productsCollection.insertOne(productWithFields);
        });
        // Registrar no histórico de importação
        const importHistoryCollection = client.db(dbName).collection('import_history');
        await importHistoryCollection.insertOne({
            filename,
            importedAt: new Date(),
        });
        console.log(`Importação do arquivo ${filename} concluída.`);
    }
    catch (error) {
        console.error(`Erro durante a importação do arquivo ${filename}:`, error);
    }
}
function startCron() {
    // Configurar o cron para executar todos os dias às 2 da manhã devido a quantidade grande de dados
    node_cron_1.default.schedule('00 02 * * *', async () => {
        // Baixar a lista de arquivos do Open Food Facts
        const indexUrl = 'https://challenges.coode.sh/food/data/json/index.txt';
        const indexResponse = await axios_1.default.get(indexUrl);
        const fileList = indexResponse.data.split('\n');
        // Para cada arquivo na lista, chamar a função de importação
        for (const filename of fileList) {
            if (filename.trim() !== '') {
                await importData(filename);
            }
        }
    });
}
exports.startCron = startCron;
//# sourceMappingURL=cron.js.map