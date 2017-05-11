module.exports = function* () {
  let query = {};
  for (prop in this.query) {
    query[prop] = this.query[prop];
  }
  let result = yield this.db.models.albums.destroy({
    where: query
  });
  this.body = result;
}
