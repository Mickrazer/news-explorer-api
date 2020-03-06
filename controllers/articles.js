const Article = require('../models/article');
const checkNull = require('../moduls/checkNull');
const { ErrorBadRequest, ErrorForbidden } = require('../moduls/errors');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then(checkNull)
    .then((articles) => res.send(articles))
    .catch((err) => next(err));
};
const addArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, description, date, source, url, image,
  } = req.body;
  Article.create({
    keyword, title, description, date, source, url, image, owner,
  })
    .then(checkNull)
    .then((article) => res.status(201).send(article))
    .catch((e) => {
      let err;
      if (/validation failed/.test(e.message)) {
        err = new ErrorBadRequest(e.message);
      } else {
        err = e;
      }
      return next(err);
    });
};
const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('owner')
    .then(checkNull)
    .then((article) => {
      if (req.user._id === article.owner.toString()) {
        return Article.findByIdAndRemove(req.params.articleId)
          .then((trueArticle) => res.send(trueArticle))
          .catch((err) => next(err));
      }
      throw new ErrorForbidden();
    })
    .catch((err) => next(err));
};

module.exports = {
  getArticles, addArticle, deleteArticle,
};
