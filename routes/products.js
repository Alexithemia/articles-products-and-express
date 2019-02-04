const express = require('express');
const router = express.Router();
const knex = require('../database');

router.route('/')
  .get(function (req, res) {
    knex.select('id', 'name', 'price', 'inventory').from('products')
      .then(function (products) {
        res.render('products/index', { products });
      })
      .catch(function () {
        res.status(500).end('unknown server error');
      });
  })

  .post(function (req, res) {
    knex('products').insert(req.body)
      .then(function () {
        knex.select('id').from('products').where('name', req.body.name)
          .then(function (product) {
            res.redirect('products/' + product[0].id);
          });
      })
      .catch(function () {
        res.render('products/new', { error: 'error: ' + result.detail });
      })
  });

router.route('/new')
  .get(function (req, res) {
    res.render('products/new');
  });

router.route('/:id')
  .get(function (req, res) {
    knex.select('id', 'name', 'price', 'inventory').from('products').where('id', req.params.id)
      .then(function (product) {
        if (product.length) {
          res.render('products/product', product[0]);
        } else {
          res.render('404');
        }
      })
      .catch(function () {
        res.status(500).end('unknown server error');
      });
  })

  .put(function (req, res) {
    knex.select('name', 'price', 'inventory').from('products').where('id', req.params.id)
      .then(function (product) {
        if (product.length) {
          let prodObj = req.body;
          delete prodObj._method;
          knex('products').where('id', req.params.id).update(prodObj)
            .then(function (result) {
              res.redirect('/products/' + req.params.id);
            })
            .catch(function (result) {
              prodObj.error = 'error: ' + result.detail;
              prodObj.id = req.params.id;
              res.status(400).render('products/edit', prodObj);
            });
        } else {
          res.render('404');
        }
      })
      .catch(function () {
        res.status(500).end('unknown server error');
      });
  })

  .delete(function (req, res) {
    knex('products').where('id', req.params.id).del()
      .then(function () {
        res.redirect('/products');
      })
      .catch(function () {
        res.status(500).end('unknown server error');
      });
  });

router.route('/:id/edit')
  .get(function (req, res) {
    knex.select('id', 'name', 'price', 'inventory').from('products').where('id', req.params.id)
      .then(function (product) {
        if (product.length) {
          res.render('products/edit', product[0]);
        } else {
          res.render('404');
        }
      })
      .catch(function () {
        res.status(500).end('unknown server error');
      });
  })

module.exports = router;