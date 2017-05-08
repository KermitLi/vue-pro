module.exports = function* (next) {
  var result = yield this.db.sync();
  if (result) {
    this.body = 'success';
  } else {
    this.body = 'failed';
  }
}
