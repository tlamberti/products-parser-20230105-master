import express from 'express';
import { startCron } from './utils/cron';
const store = require('store');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

startCron();

app.use(helmet());

// application/json type post data
app.use(bodyParser.json({
    limit: '5mb'
}));

// disable application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    const requestOrigin = req.header('origin');

    const { app, usuario } = req.headers;

    store.set('requestSelectedHeaders', {
        app: app || 0,
        origin: requestOrigin,
        usuario: usuario || 0,
    });

    next();
})

// Enable CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

module.exports = app;