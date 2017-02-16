var config = require('./db.config.js');
var mongoClient = require('mongodb').MongoClient;

var connect =  function *(){
    return yield mongoClient.connect(config.url+':'+config.port+'/'+config.db);
}

module.exports = connect;
