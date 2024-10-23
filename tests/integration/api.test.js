import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/app'; // Assuming your Express app is exported from this file

describe('API Integration Tests', function () {
    it('Should return a list of items', async function () {
        const res = await request(app).get('/api/items');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('Should create a new item', async function () {
        const newItem = { name: 'New Item', price: 150 };
        const res = await request(app).post('/api/items').send(newItem);
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal(newItem.name);
    });

    it('Should return 404 for non-existent route', async function () {
        const res = await request(app).get('/api/non-existent');
        expect(res.status).to.equal(404);
    });
});
