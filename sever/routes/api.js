var router = require('koa-router')();

router.get('/', function *(next){
    yield this.db.sync();
    this.body = yield this.db.models.users.findAll({});
});

router.get('/initDB',function *(next){
    yield this.db.sync();
    this.body = 'init db successfully';
});

module.exports = router;
