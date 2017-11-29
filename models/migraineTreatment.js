module.exports = function (sequelize, DataTypes){
  var MigraineTreatment = sequelize.define("MigraineTreatment", {}, {
  	timestamps: false
  });

  return MigraineTreatment;
}