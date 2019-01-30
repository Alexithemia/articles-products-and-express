let chai = require('chai');
let should = chai.should();
let request = require('supertest');
const server = require('../server');

describe('POST /products', function () {
  it('responds with 302 redirect to created product', function (done) {
    request(server)
      .post('/products')
      .send('name=String&price=String&inventory=String')
      .expect('Location', '/products/0')
      .expect(302, done);
  });
  it('missing an input responds with 400 error', function (done) {
    request(server)
      .post('/products')
      .send('name=String&price=String')
      .expect('Location', '/products/new')
      .expect(302, done);
  });
  it('too many inputs responds with 400 error', function (done) {
    request(server)
      .post('/products')
      .send('name=String&price=String&inventory=String&prices=String')
      .expect('Location', '/products/new')
      .expect(302, done);
  });
});

describe('PUT /products/:id', function () {
  it('responds with 302 redirect to edited product', function (done) {
    request(server)
      .put('/products/0')
      .send('name=String&price=String&inventory=String')
      .expect('Location', '/products/0')
      .expect(302, done);
  });
  it('trying to edit file that does not exist returns 500 error', function (done) {
    request(server)
      .put('/products/2')
      .send('name=String&price=String&inventory=String')
      .expect(500, done);
  });
  it('invalid input responds with 400 error', function (done) {
    request(server)
      .put('/products')
      .send('names=String&price=String')
      .expect('Location', '/products/edit')
      .expect(302, done);
  });
  it('too many inputs responds with 400 error', function (done) {
    request(server)
      .put('/products')
      .send('name=String&price=String&inventory=String&prices=String')
      .expect('Location', '/products/edit')
      .expect(302, done);
  });
});

describe('Delete /products/:id', function () {
  it('responds with 302 redirect to /products', function (done) {
    request(server)
      .post('/products')
      .send('name=String&price=String&inventory=String')
    request(server)
      .delete('/products/0')
      .send('name=String&price=String&inventory=String')
      .expect('Location', '/products')
      .expect(302, done);
  });
  it('trying to delete file that does not exist returns 500 error', function (done) {
    request(server)
      .delete('/products/2')
      .send('name=String&price=String&inventory=String')
      .expect(500, done);
  });
});

describe('GET /products/', function () {
  it('responds with 200 and html for a page with a list of products', function (done) {
    request(server)
      .get('/products')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
  it('products/:id responds with 200 and html for a page with the items information', function (done) {
    request(server)
      .post('/products')
      .send('name=String&price=String&inventory=String')
    request(server)
      .get('/products/0')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
  it('products/:id/edit responds with 200 and html for a page that has a form for editing the product', function (done) {
    request(server)
      .get('/products/edit')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
  it('products/:id/new responds with 200 and html for a page that has a form for creating a product', function (done) {
    request(server)
      .get('/products/new')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});