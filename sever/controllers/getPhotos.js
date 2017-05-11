module.exports = function* () {
  let userName = this.query.userName;
  let album = this.query.album;

  var result = yield this.db.models.photos.findAll({
    where: {
      userName,
      album
    }
  });

  this.body = result;
}
