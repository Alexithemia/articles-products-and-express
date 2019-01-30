const articles = {
  articleList: []
};
const art = articles.articleList;

function find(title) {
  let found = false;
  art.forEach(article => {
    if (article.urlTitle === encodeURI(title)) {
      found = article;
    }
  });
  return found;
}

function add(data) {
  let uri = encodeURI(data.title);
  let found = false;
  art.forEach(article => {
    if (article.urlTitle === uri) {
      found = true;
    }
  });
  if (found) {
    return false;
  }
  data.urlTitle = uri;
  art.push(data);
  return uri;
};

function change(data, title) {
  let found = false;
  art.forEach(article => {
    if (article.urlTitle === encodeURI(title)) {
      for (const key in data) {
        if (key) {
          article[key] = data[key];
        }
      }
      article.urlTitle = encodeURI(data.title);
      found = article.urlTitle;
    }
  });
  return found;
};

function remove(title) {
  let found = false;
  art.forEach(article => {
    if (article.urlTitle === encodeURI(title)) {
      art.splice(art.indexOf(article), 1);
      found = true;
    }
  });
  return found;
}

module.exports = {
  articles,
  find,
  add,
  change,
  remove
}