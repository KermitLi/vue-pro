module.exports = function* () {
  let id = this.query.id;
  var result = yield this.db.models.article.findOne({
    where: {
      id
    }
  });

  if (result) {
    this.body = result;
  } else {
    this.body = false;
  }
}
