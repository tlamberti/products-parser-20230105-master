const MongoClient = require('mongodb').MongoClient;

export const connectDB = async () => {
  const uri = process.env.MONGO;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    console.log('Conexão com o MongoDB estabelecida.');
    return client.connect();
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
