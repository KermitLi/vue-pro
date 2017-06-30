module.exports = function (db, Sequelize) {
  var result = db.define("photos", {
    userName: {
      type: Sequelize.STRING(30)
    },
    album: {
      type: Sequelize.STRING(40)
    },
    url: {
      type: Sequelize.STRING(100),
    }

  }, {
    timestamps: false,
    freezeTableName: true
  });
  return result;
};
