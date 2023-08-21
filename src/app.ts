import rotaInicial from './routers/index.router';
const app = require('./init.app');

require('dotenv').config()

// Rota principal
app.use('/', rotaInicial);

export default app;