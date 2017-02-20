module.exports = function (db, Sequelize) {
    var result = db.define("users", {
        name: {
            type: Sequelize.STRING(30)
        },
        age: {
            type: Sequelize.STRING(4)
        }
    }, {
        timestamps: false,
        freezeTableName: false
    });
    return result;
};
