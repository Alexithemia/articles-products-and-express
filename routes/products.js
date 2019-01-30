const express = require('express');
const router = express.Router();
const productsDB = require('../db/products');

router.route('/')
  .get(function (req, res) {
    res.render('products/index', productsDB.products);
  })
  .post(function (req, res) {
    let id = productsDB.add(req.body);
    res.redirect('/products/' + id);
  });

router.route('/new')
  .get(function (req, res) {
    res.render('products/new');
  })

router.route('/:id')
  .get(function (req, res) {
    let item = productsDB.find(req.params.id);
    if (!item) {
      res.status(404).render('404');
    } else {
      res.render('products/product', item);
    }
  })
  .put(function (req, res) {
    if (productsDB.change(req.body, req.params.id)) {
      res.redirect('/products/' + req.params.id);
    } else {
      res.redirect(400, '/products');
    }
  })
  .delete(function (req, res) {
    if (productsDB.remove(req.params.id)) {
      res.redirect('/products');
    } else {
      res.redirect(400, '/products');
    }
  });

router.route('/:id/edit')
  .get(function (req, res) {
    let item = productsDB.find(req.params.id);
    if (!item) { return res.status(404).render('404') }
    res.render('products/edit', item);
  })



module.exports = router;