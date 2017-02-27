module.exports = function (db, Sequelize) {
    var result = db.define("users", {
        name: {
            type: Sequelize.STRING(30)
        },
        pwd: {
            type: Sequelize.STRING(40)
        }
    }, {
        timestamps: false,
        freezeTableName: false
    });
    return result;
};
