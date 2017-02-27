const jwt = require('koa-jwt');
module.exports = function * (next){
    let userInfo = this.request.body;
    let result = yield this.db.models.users.findOne({where:{name:userInfo.name}});
    let message = '';
    let state = false;
    if(result===null){
        message = '用户不存在';
        this.body = {state,message};
    }
    else {
        if(result.pwd===userInfo.pwd){
            state  = true;
            let secret = 'Kermit';
            let token = jwt.sign(userInfo,secret);
            this.body = {state:true,token:token};
        }
        else {
            message='密码错误';
            state = false;
            this.body = {state,message};
        }
    }
}
