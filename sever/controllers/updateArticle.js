module.exports = function* () {
  let article = this.request.body;
  var result = yield this.db.models.article.update({
    title: article.title,
    contents: article.contents
  }, {
    where: {
      userName: article.userName,
      id: article.id
    }
  });

  if (result) {
    this.body = true;
  } else {
    this.body = false;
  }
}
