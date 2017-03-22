module.exports = function *(next){
    var result = yield this.db.sync({force:true});
    if(result){
        this.body = 'success';
    }
    else{
        this.body = 'failed';
    }
}
