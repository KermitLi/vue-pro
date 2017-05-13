module.exports = function* () {
  let query = this.query;
  let name = query.name;
  let email = query.email.toLowerCase();
  let avatar_url = query.avatar_url;
  let signature = query.signature;

  var result = yield this.db.models.users.update({
    email,
    avatar_url,
    signature
  }, {
    where: {
      name
    }
  });

  this.body = result;
}
