const Sequelize = require('sequelize');
const Config = require('../config.js');
const fs = require('fs');
const path = require('path');

let database = null;
const sequelize = new Sequelize(Config.mysql, {
    logging: Config.debug,
    pool: Config.pool,
    timezone: '+08:00'
});

module.exports.orm = function *(next) {
    if (!database) {
        database = sequelize;
        fs
            .readdirSync(path.join(__dirname, '../models'))
            .filter(function (file) {
                return (file.indexOf(".") !== 0);
            })
            .forEach(function (file) {
                sequelize.import(path.join(__dirname, '../models/', file));
            });
      yield database.sync();
    }
    this.db = database;
    yield next;
};
