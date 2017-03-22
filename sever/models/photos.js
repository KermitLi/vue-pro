module.exports = function (db, Sequelize) {
    var result = db.define("users", {
        userName: {
            type: Sequelize.STRING(30)
        },
        album: {
            type: Sequelize.STRING(40)
        },
        url:{
            type: Sequelize.STRING(100),
        }
        
    }, {
        timestamps: true,
        freezeTableName: true
    });
    return result;
};