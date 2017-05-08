module.exports = function* (next) {
  var article = this.request.body;
  let userName = article.userName;
  var result = yield this.db.models.article.create(article);
  if (result) {
    this.body = true;
    yield this.db.models.draft.destroy({
      where: {
        userName
      }
    });
  } else {
    this.body = false;
  }
}
