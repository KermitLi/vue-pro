module.exports = function* () {
  console.log(this.query);
  let userName = this.query.userName;
  console.log(userName);
  var result = yield this.db.models.draft.findOne({
    where: {
      userName
    }
  });

  if (result) {
    this.body = result;
  } else {
    this.body = false;
  }
}
