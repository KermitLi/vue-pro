const fs = require('fs');
const path = require('path');
module.exports = function* () {
  let query = {};
  for (prop in this.query) {
    query[prop] = this.query[prop];
  }
  let deleteItems = yield this.db.models.photos.findAll({
    where: query
  });
  let result = yield this.db.models.photos.destroy({
    where: query
  });
  this.body = result;
  deleteItems.forEach((item) => {
    fs.unlink(path.join(__dirname, '../public', item.url));
  });
}
