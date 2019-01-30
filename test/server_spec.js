let chai = require('chai');
let should = chai.should();
let request = require('supertest');
const server = require('../server');

describe('GET /products', function () {
  it('responds with html', function (done) {
    request(server)
      .get('/products')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});