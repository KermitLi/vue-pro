module.exports = function* () {
  let userName = this.query.userName;
  var result = yield this.db.models.albums.findAll({
    where: {
      userName
    }
  });

  this.body = result;
}
