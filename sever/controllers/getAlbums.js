module.exports = function* () {
  var result = yield this.db.models.albums.findAll({
    where: this.query
  });

  this.body = result;
}
