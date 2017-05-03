const jwt = require('koa-jwt');
module.exports = function* (next) {
  let userInfo = this.request.body;
  let result = yield this.db.models.users.findOne({
    where: {
      name: userInfo.name
    }
  });
  if (result === null) {
    this.body = {
      state: 1
    };
  } else {
    if (result.pwd === userInfo.pwd) {
      let secret = 'Kermit';
      let token = jwt.sign(userInfo, secret);
      this.body = {
        state: 0,
        token: token
      };
    } else {
      this.body = {
        state: 2
      };
    }
  }
}
