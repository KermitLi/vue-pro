module.exports = function * (next){
    let userName = this.request.body.name;
    let result = yield this.db.models.users.findOne({where:{name:userName}});
    if(!result){
        this.body = true;
    }
    else{
        this.body = false;
    }

}
