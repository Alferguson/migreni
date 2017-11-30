'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        len: {
          args: [1],
          msg: "Category name must be at least 1 character"
        }
      }
    }
  }, {
    timestamps: false,
  });

  Category.associate = function(models) {
    Category.hasMany(models.Treatment, {
      onDelete: 'CASCADE',
      as: 'Treatments'
    });
  }
  return Category;
};