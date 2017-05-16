module.exports = function* () {
  let query = {};
  for (prop in this.query) {
    query[prop] = this.query[prop];
  }
  var result = yield this.db.models.albums.findAll({
    where: query
  });

  this.body = result;
}
