const path = require('path');
module.exports = {
  middleware: ['orm', 'apiMessage'],
  port: 3000,
  keys: ['club-server'],
  orm: {
    name: 'blog',
    modelPath: path.join(__dirname, '../app/models'),
    db: 'blog',
    username: 'root',
    password: '123456',
    dialect: 'mysql',
    host: '121.42.149.102',
    port: 3306,
    pool: {
      max: 10,
      min: 0,
      idle: 30000
    }
  }
};