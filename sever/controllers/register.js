module.exports = function * (next){
    let userInfo = this.request.body;
    let result = yield this.db.models.users.create(userInfo);
    this.body = result;
}
