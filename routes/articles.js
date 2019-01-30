const express = require('express');
const router = express.Router();
const articlesDB = require('../db/articles');

router.route('/')
  .get(function (req, res) {
    res.render('articles/index', articlesDB.articles);
  })
  .post(function (req, res) {
    console.log('post');

    let title = articlesDB.add(req.body);
    if (title) {
      res.redirect('/articles/' + title);
    } else {
      res.send('That article already exists');
    };
  });

router.route('/new')
  .get(function (req, res) {
    res.render('articles/new');
  })

router.route('/:title')
  .get(function (req, res) {
    let item = articlesDB.find(req.params.title);
    if (!item) {
      res.render('404');
    } else {
      res.render('articles/article', item);
    }
  })
  .put(function (req, res) {
    let result = articlesDB.change(req.body, req.params.title);
    if (result) {
      res.redirect('/articles/' + result);
    } else {
      res.send('That article does not exist');
    }
  })
  .delete(function (req, res) {
    if (articlesDB.remove(req.params.title)) {
      res.redirect('/articles');
    } else {
      res.send('That article does not exist');
    }
  });

router.route('/:title/edit')
  .get(function (req, res) {
    let item = articlesDB.find(req.params.title);
    if (!item) {
      res.render('404', item)
    } else {
      res.render('articles/edit', item);
    }
  })

module.exports = router;