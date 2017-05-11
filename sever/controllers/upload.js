module.exports = function* () {
  let photo = this.request.body;
  var result = yield this.db.models.photos.create(photo);
  if (result) {
    this.body = {
      state: true,
      result
    };

  } else {
    this.body.state = false;
  }
}
