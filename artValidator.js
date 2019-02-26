let keyMap = {
  _method: true,
  urltitle: true,
  title: true,
  author: true,
  body: true
}

function postCheck(req, res, next) {
  if (!req.body.title || !req.body.author || !req.body.body || Object.keys(req.body).length > 3) {
    return res.redirect(400, '/articles/new');
  }
  next();
}

function putCheck(req, res, next) {
  if (Object.keys(req.body).length > 4) {
    return res.redirect(400, '/articles/edit');
  }
  for (const key in req.body) {
    if (!keyMap[key]) {
      return res.redirect(400, '/articles/edit');
    }
  }
  next();
}

module.exports = function (req, res, next) {
  switch (req.method) {
    case 'GET':
      next();
      break;
    case 'POST':
      postCheck(req, res, next)
      break;
    case 'PUT':
      putCheck(req, res, next);
      break;
    case 'DELETE':
      next();
      break;
    default:
      res.end('Method not supported')
      break;
  }
}