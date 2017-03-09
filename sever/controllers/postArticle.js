module.exports = function *(next){
    var article = this.request.body;
    var result = yield this.db.models.article.create(article);
    if(result){
        this.body = true
    }
    else {
        this.body = false;
    }
}
