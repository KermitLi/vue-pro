module.exports = function *(next){
    var result = yield this.db.models.article.findAll({});
    this.body = result;
}
