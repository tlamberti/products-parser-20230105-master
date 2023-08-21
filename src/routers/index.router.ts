const express = require('express');
// const { body } = require('express-validator');
const router = express.Router();

import * as ProdutosController from '../controllers/produtos.controller';
import Validador from '../utils/validacoes';


//  Endpoint responsável por mostrar detalhes da API, se conexão leitura e escritura com a base de dados está OK, horário da última vez que o CRON foi executado, tempo online e uso de memória.
router.get('/', Validador.errorHandler, ProdutosController.buscarDetalhesApi);

//  Endpoint responsável por receber atualizações do Projeto Web
router.put('/products/:code', Validador.errorHandler, ProdutosController.alterarProduto);

//  Endpoint responsável por mudar o status do produto para trash
router.delete('/products/:code', Validador.errorHandler, ProdutosController.deletarProduto);

//  Endpoint responsável por obter a informação somente de um produto da base de dados
router.get('/products/:code', Validador.errorHandler, ProdutosController.buscarProdutoPorCodigo);

//  Endpoint responsável por listar todos os produtos da base de dados, adicionar sistema de paginação para não sobrecarregar o REQUEST
router.get('/products', Validador.errorHandler, ProdutosController.buscarTodosProdutos);

export default router;