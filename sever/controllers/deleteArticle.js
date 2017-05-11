module.exports = function* (next) {
  let id = this.query.id;
  let result = yield this.db.models.article.destroy({
    where: {
      id
    }
  });
  this.body = result;
}
