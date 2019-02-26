const express = require('express');
const router = express.Router();
const knex = require('../database');

router.route('/')
  .get(function (req, res) {
    knex.select('urltitle', 'title', 'author', 'body', 'urltitle')
      .from('articles')
      .orderBy('updated_at', 'desc')
      .then(function (articles) {
        res.render('articles/index', { articles });
      })
      .catch(function () {
        res.status(500).end('unknown server error');
      });
  })

  .post(function (req, res) {
    let artObj = req.body;
    artObj.urltitle = encodeURI(artObj.title.toLowerCase());
    knex('articles').insert(artObj)
      .then(function (result) {
        res.redirect('articles/' + artObj.urltitle);
      })
      .catch(function (result) {
        res.render('articles/new', { error: 'error: ' + result.detail });
      });
  });


router.route('/new')
  .get(function (req, res) {
    res.render('articles/new');
  });

router.route('/:title')
  .get(function (req, res) {
    knex.select('urltitle', 'title', 'author', 'body')
      .from('articles')
      .where('urltitle', encodeURI(req.params.title.toLowerCase()))
      .then(function (article) {
        if (article.length) {
          res.render('articles/article', article[0]);
        } else {
          res.render('404');
        }
      });
  })

  .put(function (req, res) {
    knex.select('title', 'author', 'body')
      .from('articles')
      .where('urltitle', encodeURI(req.params.title.toLowerCase()))
      .then(function (article) {
        if (article.length) {
          let artObj = req.body;
          delete artObj._method;
          if (artObj.title) {
            artObj.urltitle = encodeURI(artObj.title.toLowerCase());
          };
          knex('articles')
            .where('urltitle', encodeURI(req.params.title.toLowerCase()))
            .update(artObj)
            .then(function (result) {
              if (artObj.urltitle) {
                res.redirect('/articles/' + artObj.urltitle);
              } else {
                res.redirect('/articles/' + req.params.title);
              }
            })
            .catch(function (result) {
              artObj.urltitle = encodeURI(req.params.title.toLowerCase());
              artObj.origtitle = req.params.title;
              artObj.error = 'error: ' + result.detail;
              res.status(400).render('articles/edit', artObj);
            });
        } else {
          res.render('404');
        }
      });
  })

  .delete(function (req, res) {
    knex('articles')
      .where('urltitle', encodeURI(req.params.title.toLowerCase())).del()
      .then(function () {
        res.redirect('/articles');
      })
      .catch(function () {
        res.status(500).end('unknown server error');
      });
  });

router.route('/:title/edit')
  .get(function (req, res) {
    knex.select('title', 'author', 'body', 'urltitle')
      .from('articles').where('urltitle', encodeURI(req.params.title.toLowerCase()))
      .then(function (article) {
        if (article.length) {
          article[0].origtitle = article[0].title;
          res.render('articles/edit', article[0]);
        } else {
          res.render('404');
        }
      })
      .catch(function () {
        res.status(500).end('unknown server error');
      });
  })

module.exports = router;