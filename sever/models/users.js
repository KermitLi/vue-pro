module.exports = function (db, Sequelize) {
  var result = db.define("users", {
    name: {
      type: Sequelize.STRING(30)
    },
    pwd: {
      type: Sequelize.STRING(40)
    },
    email: {
      type: Sequelize.STRING(100)
    },
    avatar_url: {
      type: Sequelize.STRING(100),
      defaultValue: '/photos/logo.jpg'
    },
    signature: {
      type: Sequelize.STRING(50),
      defaultValue: '你还没有个性签名'
    }

  }, {
    timestamps: false,
    freezeTableName: false
  });
  return result;
};
