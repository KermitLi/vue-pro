var config = require('./db.config.js');
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var connect =  function *(callback){
    return yield mongoClient.connect(config.url+':'+config.port+'/'+config.db);
}

module.exports = connect;
