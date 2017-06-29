module.exports = function (opt, app) {
    return function (ctx, next) {
        // toApiMessage(0,{a:1}) =>{errorCode:0,data:{a:1}}
        // toApiMessage(603,'错误') =>{errorCode:0,message:'错误'}}
        ctx.toApiMessage = function (status = 0, data) {
            let token
            if (ctx.state && ctx.state.user) {
                token = app.jwt.sign(ctx.state.user, app.config.jwt.secret)
            }
            if (status === 0) {
                ctx.body = {
                    errorCode: status,
                    message: 'success',
                    data,
                    token
                }
            } else {
                ctx.body = {
                    errorCode: status,
                    message: data,
                    token
                }
            }
        }
        return next()
    }
}
