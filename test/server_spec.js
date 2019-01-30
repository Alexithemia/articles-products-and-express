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
  it('missing an input responds with redirect to /products/new with 400 error', function (done) {
    request(server)
      .post('/products')
      .send('name=String&price=String')
      .expect('Location', '/products/new')
      .expect(400, done);
  });
  it('too many inputs responds with redirect to /products/new with 400 error', function (done) {
    request(server)
      .post('/products')
      .send('name=String&price=String&inventory=String&prices=String')
      .expect('Location', '/products/new')
      .expect(400, done);
  });
});

describe('PUT /products/:id', function () {
  it('responds with redirect to edited product', function (done) {
    request(server)
      .put('/products/0')
      .send('name=String&price=String&inventory=String')
      .expect('Location', '/products/0')
      .expect(302, done);
  });
  it('trying to edit file that does not exist returns redirect to /products with 400 error', function (done) {
    request(server)
      .put('/products/2')
      .send('name=String&price=String&inventory=String')
      .expect('Location', '/products')
      .expect(400, done);
  });
  it('invalid input responds with redirect to /products/edit with 400 error', function (done) {
    request(server)
      .put('/products')
      .send('names=String&price=String')
      .expect('Location', '/products/edit')
      .expect(400, done);
  });
  it('too many inputs responds with redirect to /products/edit with 400 error', function (done) {
    request(server)
      .put('/products')
      .send('name=String&price=String&inventory=String&prices=String')
      .expect('Location', '/products/edit')
      .expect(400, done);
  });
});

describe('Delete /products/:id', function () {
  it('responds with 302 redirect to /products', function (done) {
    request(server)
      .delete('/products/0')
      .send('name=String&price=String&inventory=String')
      .expect('Location', '/products')
      .expect(302, done);
  });
  it('trying to delete file that does not exist redirects to /products with 400 error', function (done) {
    request(server)
      .delete('/products/2')
      .send('name=String&price=String&inventory=String')
      .expect('Location', '/products')
      .expect(400, done);
  });
});

describe('GET /products/', function () {
  before(function (done) {
    request(server)
      .post('/products')
      .send('name=String&price=String&inventory=String')
      .expect(302, done)
  });
  it('responds with 200 and html for a page with a list of products', function (done) {
    request(server)
      .get('/products')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
  it('a non-existant page responds with 404 and html for a 404 page', function (done) {
    request(server)
      .get('/products34')
      .expect('Content-Type', /html/)
      .expect(404, done);
  });
  it('products/:id responds with 200 and html for a page with the items information', function (done) {
    request(server)
      .get('/products/1')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
  it('products/:id/edit responds with 200 and html for a page that has a form for editing the product', function (done) {
    request(server)
      .get('/products/1/edit')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
  it('products/new responds with 200 and html for a page that has a form for creating a product', function (done) {
    request(server)
      .get('/products/new')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('POST /articles', function () {
  it('responds with 302 redirect to created product', function (done) {
    request(server)
      .post('/articles')
      .send('title=String&author=String&body=String')
      .expect('Location', '/articles/String')
      .expect(302, done);
  });
  it('missing an input responds with redirect to new article form with 400 error', function (done) {
    request(server)
      .post('/articles')
      .send('title=String&author=String')
      .expect('Location', '/articles/new')
      .expect(400, done);
  });
  it('too many inputs responds with redirect to new article form with 400 error', function (done) {
    request(server)
      .post('/articles')
      .send('title=String&author=String&body=String&sources=String')
      .expect('Location', '/articles/new')
      .expect(400, done);
  });
});

describe('PUT /articles/:title', function () {
  it('responds with 302 redirect to edited product', function (done) {
    request(server)
      .put('/articles/String')
      .send('title=String%207&author=String&body=String')
      .expect('Location', '/articles/String%207')
      .expect(302, done);
  });
  it('trying to edit file that does not exist redirects to /articles with 400 error', function (done) {
    request(server)
      .put('/articles/article2')
      .send('title=String&author=String&body=String')
      .expect('Location', '/articles')
      .expect(400, done);
  });
  it('invalid input responds with redirect to edit page with 400 error', function (done) {
    request(server)
      .put('/articles')
      .send('name=String&author=String')
      .expect('Location', '/articles/edit')
      .expect(400, done);
  });
  it('too many inputs responds with redirect to edit page with 400 error', function (done) {
    request(server)
      .put('/articles')
      .send('title=String&author=String&body=String&bodies=String')
      .expect('Location', '/articles/edit')
      .expect(400, done);
  });
});

describe('Delete /articles/:title', function () {
  it('responds with 302 redirect to /articles', function (done) {
    request(server)
      .delete('/articles/String%207')
      .expect('Location', '/articles')
      .expect(302, done);
  });
  it('trying to delete file that does not exist redirects to /articles with status 400', function (done) {
    request(server)
      .delete('/articles/number2')
      .expect('Location', '/articles')
      .expect(400, done);
  });
});

describe('GET /articles', function () {
  before(function (done) {
    request(server)
      .post('/articles')
      .send('title=String&author=String&body=String')
      .expect(302, done)
  })
  it('/ responds with 200 and html for a page with a list of articles', function (done) {
    request(server)
      .get('/articles')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
  it('a non-existant page responds with 404 and html for a 404 page', function (done) {
    request(server)
      .get('/articles34')
      .expect('Content-Type', /html/)
      .expect(404, done);
  });
  it('articles/:id responds with 200 and html for a page with the articles information', function (done) {
    request(server)
      .get('/articles/String')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
  it('articles/:id/edit responds with 200 and html for a page that has a form for editing the product', function (done) {
    request(server)
      .get('/articles/String/edit')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
  it('articles/new responds with 200 and html for a page that has a form for creating a product', function (done) {
    request(server)
      .get('/articles/new')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});