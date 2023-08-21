import axios from 'axios';
import zlib from 'zlib';
import JSONStream from 'JSONStream';
import { Readable } from 'stream';
import cron from 'node-cron';
import { connectDB } from './db'; // Substitua pela sua função de conexão
import { Produtos } from 'src/models/produtos.interface';

const dbName = 'OpenFood';

async function importData(filename: string) {
  try {
    // Baixar o arquivo JSON compactado do Open Food Facts
    const dataUrl = `https://challenges.coode.sh/food/data/json/${filename}`;
    const dataResponse = await axios.get(dataUrl, { responseType: 'arraybuffer' });
    
    // Descompactar o arquivo usando a biblioteca zlib
    const decompressedData = zlib.unzipSync(dataResponse.data);

    // Criar um stream de leitura do buffer descompactado
    const readableStream = new Readable();
    readableStream.push(decompressedData);
    readableStream.push(null);

    // Usar o JSONStream para processar o stream em chunks
    const jsonStream = readableStream.pipe(JSONStream.parse('*'));

    // Conectar ao MongoDB usando a função de conexão do seu código
    const client = await connectDB();

    // Inserir produtos no MongoDB diretamente a partir do stream
    const productsCollection = client.db(dbName).collection('produtos');

    jsonStream.on('data', async (product: Produtos) => {
      // Adicionar os campos personalizados aos produtos
      const imported_t = new Date();
      const status = 'published';
      const productWithFields = {
        ...product,
        imported_t,
        status,
      };
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
  } catch (error) {
    console.error(`Erro durante a importação do arquivo ${filename}:`, error);
  }
}

export function startCron() {
  // Configurar o cron para executar todos os dias às 2 da manhã devido a quantidade grande de dados
  cron.schedule('00 02 * * *', async () => {
    // Baixar a lista de arquivos do Open Food Facts
    const indexUrl = 'https://challenges.coode.sh/food/data/json/index.txt';
    const indexResponse = await axios.get(indexUrl);
    const fileList = indexResponse.data.split('\n');

    // Para cada arquivo na lista, chamar a função de importação
    for (const filename of fileList) {
      if (filename.trim() !== '') {
        await importData(filename);
      }
    }
  });
}