module.exports = function(db,Sequelize){
  return db.define('albums',{
    name:{
      type:Sequelize.STRING(30)
    },
    userName:{
      type:Sequelize.STRING(30)
    }
  },{
    timestamps:true,
    freezeTableName:true
  });
}