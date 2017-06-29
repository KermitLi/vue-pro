var Ribes = require('ribes')
var app = new Ribes()
var start = Date.now()
app.listen(app.config.port)

app.logger.info('服务器启动 耗时 %d', Date.now() - start)
app.logger.info('监听端口： %d', app.config.port)
