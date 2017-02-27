module.exports = function * (next){
    let userName = this.request.body.name;
    let result = yield this.db.models.users.findOne({where:{name:userName}});
    this.body = result;
}
