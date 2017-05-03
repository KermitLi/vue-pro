module.exports = function* () {
  let {
    name,
    pwd: newPwd,
    email
  } = this.request.body;

  console.log(name, email);

  let result = yield this.db.models.users.update({
    pwd: newPwd
  }, {
    where: {
      name: name,
      email: email
    }
  });

  if (result) {
    this.body = true;
  } else {
    this.body = false;
  }
}
