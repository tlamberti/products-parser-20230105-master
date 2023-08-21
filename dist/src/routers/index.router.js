"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
// const { body } = require('express-validator');
const router = express.Router();
const ProdutosController = __importStar(require("../controllers/produtos.controller"));
const validacoes_1 = __importDefault(require("../utils/validacoes"));
//  Endpoint responsável por mostrar detalhes da API, se conexão leitura e escritura com a base de dados está OK, horário da última vez que o CRON foi executado, tempo online e uso de memória.
router.get('/', validacoes_1.default.errorHandler, ProdutosController.buscarDetalhesApi);
//  Endpoint responsável por receber atualizações do Projeto Web
router.put('/products/:code', validacoes_1.default.errorHandler, ProdutosController.alterarProduto);
//  Endpoint responsável por mudar o status do produto para trash
router.delete('/products/:code', validacoes_1.default.errorHandler, ProdutosController.deletarProduto);
//  Endpoint responsável por obter a informação somente de um produto da base de dados
router.get('/products/:code', validacoes_1.default.errorHandler, ProdutosController.buscarProdutoPorCodigo);
//  Endpoint responsável por listar todos os produtos da base de dados, adicionar sistema de paginação para não sobrecarregar o REQUEST
router.get('/products', validacoes_1.default.errorHandler, ProdutosController.buscarTodosProdutos);
exports.default = router;
//# sourceMappingURL=index.router.js.map