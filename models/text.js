'use strict';
module.exports = (sequelize, DataTypes) => {
  var text = sequelize.define('text', {
    name: DataTypes.STRING,
    text: DataTypes.TEXT,
    value: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return text;
};