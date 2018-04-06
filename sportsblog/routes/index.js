const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  Article.getArticles((err, articles) => {
    if(err){
      res.send(err);
    }
    res.render('index', {
      title: 'SportsBlog',
      articles: articles
    });
  });
});

module.exports = router;