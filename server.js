const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const products = require('./routes/products');
const articles = require('./routes/articles');
const pValid = require('./prodValidator');
const aValid = require('./artValidator');
const methodOverride = require('method-override');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'));

app.use(function (req, res, next) {
  let time = new Date();
  fs.appendFile(`./logs/${time.getFullYear()}.${time.getMonth()}-${time.getDay()}.log`, `${req.method} ${req.path} ${time}\n`, function (err) {
    if (err) throw err;
  });
  next();
})

app.use('/products', pValid, products);

app.use('/articles', aValid, articles);

app.listen(PORT, function () {
  console.log(`Server running on port: ${PORT}`);
});

module.exports = app;