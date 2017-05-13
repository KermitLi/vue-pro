module.exports = function* () {
  let name = this.query.name;
  var result = yield this.db.models.users.findOne({
    where: {
      name
    }
  });
  this.body = result;
}
