import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../dist/src/server';

// Use o chai-http plugin
chai.use(chaiHttp);
const expect = chai.expect;

describe('Teste dos Endpoints', () => {
    it('Deve buscar detalhes da API', async () => {
        const response = await chai.request(app).get('/');
        expect(response).to.have.status(200);
        
    });

    it('Deve alterar um produto', async () => {
        const response = await chai.request(app)
            .put('/products/123')
            .send({ /* Dados fictícios do produto a serem alterados */ });

        expect(response).to.have.status(200);
        
    });

    it('Deve deletar um produto', async () => {
        const response = await chai.request(app).delete('/products/123');

        expect(response).to.have.status(200);
        
    });

    it('Deve buscar um produto por código', async () => {
        const response = await chai.request(app).get('/products/123');

        expect(response).to.have.status(200);

    });

    it('Deve buscar todos os produtos', async () => {
        const response = await chai.request(app).get('/products');

        expect(response).to.have.status(200);
        
    });
});
