module.exports = function (db, Sequelize) {
  var result = db.define('draft', {
    title: {
      type: Sequelize.STRING(100)
    },
    contents: {
      type: Sequelize.STRING(10000)
    },
    userName: {
      type: Sequelize.STRING(30)
    }
  }, {
    timestamps: true,
    freezeTableName: true
  });

  return result;
}
