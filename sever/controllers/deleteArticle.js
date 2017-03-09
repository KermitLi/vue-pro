module.exports = function *(next){
    var query = {};
    for(prop in Object(this.query)){
        if(prop=='id'){
            query[prop] = Number(Object(this.query)[prop]);
        }
        else {
            query[prop] = Object(this.query)[prop];
        }
    }

    var result = yield this.db.models.article.destroy({where:query});
    this.body = result;
}
