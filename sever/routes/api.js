var router = require('koa-router')();

router.get('/', function *(next){
    this.body = yield this.db.models.users.findAll({});
});

router.get('/initDB',function *(next){
    yield this.db.models.users.create({name:'lixuan',age:'21'});
    this.body = 'init db successfully';
});

module.exports = router;
