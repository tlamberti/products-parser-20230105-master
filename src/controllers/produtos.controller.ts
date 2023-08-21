import { Produtos } from 'src/models/produtos.interface';
const MongoClient = require('mongodb').MongoClient;


export const buscarDetalhesApi = async (req, res) => {
  try {
    try {
      // Conexão com a base de dados
      let dbConnectionStatus = ''
      let lastImportHistory = ''
      try {
        const uri = process.env.MONGO;
        const instancia = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await instancia.connect();
        const historyCollection = instancia.db('OpenFood').collection('import_history');
        lastImportHistory = await historyCollection.findOne({}, { sort: { importedAt: -1 } });

        await instancia.close();
        dbConnectionStatus = 'Conexão com a base de dados OK';
      } catch (error) {
        dbConnectionStatus = 'Erro na conexão com a base de dados ' + error;
      }
      // Tempo online
      const uptime = process.uptime();

      // Uso de memória
      const memoryUsage = process.memoryUsage();

      return res.status(200).json({
        apiDetails: 'API OpenFood',
        dbConnectionStatus,
        uptime,
        memoryUsage,
        lastCronExecute: lastImportHistory
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar detalhes da API.' });
    }
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao conectar com a API.')
  }

  return undefined
}

export const alterarProduto = async (req, res) => {

  const codProduto = req.params.code.toString();

  try {
    // Conectar ao MongoDB usando a função de conexão do seu código
    const uri = process.env.MONGO;
    const instancia = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await instancia.connect();
    const productsCollection = instancia.db('OpenFood').collection('produtos');

    // Verificar se o produto com o código existe
    const query = { code: parseInt(codProduto) };
    const existingProduct = await productsCollection.findOne(query);
    console.log(existingProduct);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    // Criar um objeto atualizado com base no produto existente
    const updatedProduct: Produtos = {
      ...existingProduct,
      ...req.body,
    };

    // Atualizar o produto no MongoDB
    await productsCollection.updateOne({ _id: existingProduct._id }, { $set: updatedProduct });

    return res.status(200).json({ message: 'Produto alterado com sucesso.', product: updatedProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao conectar com o banco de dados.' });
  }
}

export const deletarProduto = async (req, res) => {

  const codProduto = parseInt(req.params.code);

  try {
    const uri = process.env.MONGO;
    const instancia = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await instancia.connect();
    const productsCollection = instancia.db('OpenFood').collection('produtos');

    // Verificar se o produto com o código existe
    const existingProduct = await productsCollection.findOne({ code: codProduto });
    if (!existingProduct) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    // Deletar o produto do MongoDB
    await productsCollection.deleteOne({ _id: existingProduct._id });

    return res.status(200).json({ message: 'Produto deletado com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao conectar com o banco de dados.' });
  }
}

export const buscarProdutoPorCodigo = async (req, res) => {

  const codProduto = parseInt(req.params.code);

  try {
    // Conectar ao MongoDB usando a função de conexão do seu código
    const uri = process.env.MONGO;
    const instancia = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await instancia.connect();
    const productsCollection = instancia.db('OpenFood').collection('produtos');

    // Buscar o produto com o código no MongoDB
    const product = await productsCollection.findOne({ code: codProduto });
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao conectar com o banco de dados.' });
  }
}

export const buscarTodosProdutos = async (req, res) => {
  try {
    // Conectar ao MongoDB usando a função de conexão do seu código
    const uri = process.env.MONGO;
    const instancia = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await instancia.connect();
    const productsCollection = instancia.db('OpenFood').collection('produtos');

    // Buscar todos os produtos no MongoDB
    const allProducts = await productsCollection.find({}).toArray();

    return res.status(200).json({ products: allProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao conectar com o banco de dados.' });
  }
}