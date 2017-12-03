module.exports = function (sequelize, DataTypes){
  var UserTreatment = sequelize.define("UserTreatment", {}, {
  	timestamps: false
  });
  return UserTreatment;
}