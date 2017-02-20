var router = require('koa-router')();

router.get('/', function *(next){
    this.db.sync();
    yield this.db.models.users.create({
      name:'hello',
      age:'32'
    });
    this.body = yield this.db.models.users.findAll({});
});

module.exports = router;
