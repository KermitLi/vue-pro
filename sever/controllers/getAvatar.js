module.exports = function* () {
  let userName = this.query.userName;
  var result = yield this.db.models.users.findOne({
    userName
  });

  if (result) {
    this.body = {
      state: true,
      url: result.avatar_url
    };
  } else {
    this.body = {
      state: false
    };
  }

}
