module.exports = function* () {
  let draft = this.request.body;
  let title = draft.title;
  let contents = draft.contents;
  let userName = draft.userName;


  let result = yield this.db.models.draft.findOne({
    where: {
      userName
    }
  });

  if (result) {
    result = yield this.db.models.draft.update({
      title,
      contents
    }, {
      where: {
        userName
      }
    });
  } else {
    result = yield this.db.models.draft.create({
      title,
      contents,
      userName
    });
  }

  if (result) {
    this.body = true;
  } else {
    this.body = false;
  }
}
