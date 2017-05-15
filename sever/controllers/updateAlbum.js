module.exports = function* () {
  let album = this.request.body;

  var result = yield this.db.models.albums.findOne({
    where: {
      userName: album.userName,
      name: album.name
    }
  });

  if (album.name != result.name && result) {
    this.body = {
      state: false,
      error_code: 0
    };
  } else {
    result = yield this.db.models.albums.update({
      name: album.name,
      desc: album.desc
    }, {
      where: {
        userName: album.userName,
        name: album.oldName,
        desc: album.oldDesc
      }
    });
    if (result) {
      this.body = {
        state: true,
        result
      };
    } else {
      this.body = {
        state: false,
        error_code: 1
      };
    }
  }
}
