"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const MongoClient = require('mongodb').MongoClient;
const connectDB = async () => {
    const uri = process.env.MONGO;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        console.log('Conexão com o MongoDB estabelecida.');
        return client.connect();
    }
    catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
exports.default = exports.connectDB;
//# sourceMappingURL=db.js.map