"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_router_1 = __importDefault(require("./routers/index.router"));
const app = require('./init.app');
require('dotenv').config();
// Rota principal
app.use('/', index_router_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map