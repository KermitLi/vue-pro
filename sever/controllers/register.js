module.exports = function * (next){
    let userInfo = this.request.body;
    let result = yield this.db.models.users.create(userInfo);
    if(result){
        this.body = true;
    }
    else {
        this.body = false;
    }
    
}
