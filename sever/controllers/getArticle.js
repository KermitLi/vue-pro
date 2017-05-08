module.exports = function* (next) {
  var userName = this.query.userName;
  if (userName) {
    var result = yield this.db.models.article.findAll({
      where: {
        userName
      }
    });
  } else {
    var result = yield this.db.models.article.findAll({});
  }
  this.body = result;
}
