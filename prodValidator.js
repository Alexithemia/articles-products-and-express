let keyMap = {
  _method: true,
  id: true,
  name: true,
  price: true,
  inventory: true
}

function postCheck(req, res, next) {
  if (!req.body.name || !req.body.price || !req.body.inventory || Object.keys(req.body).length > 3) {
    return res.redirect(400, '/products/new')
  }
  next();
};

function putCheck(req, res, next) {
  if (Object.keys(req.body).length > 5) {
    return res.redirect(400, '/products/edit');
  }
  for (const key in req.body) {
    if (!keyMap[key]) {
      return res.redirect(400, '/products/edit');
    }
  }
  next();
};

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