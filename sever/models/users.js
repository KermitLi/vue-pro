module.exports = function (db, Sequelize) {
  var result = db.define("users", {
    name: {
      type: Sequelize.STRING(30)
    },
    pwd: {
      type: Sequelize.STRING(40)
    },
    email: {
      type: Sequelize.STRING(500)
    },
    avatar_url: {
      type: Sequelize.STRING(100),
      defaultValue: '/photos/logo.jpg'
    }

  }, {
    timestamps: false,
    freezeTableName: false
  });
  return result;
};
