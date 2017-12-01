module.exports = function(sequelize, Datatypes) {
  var Treatment = sequelize.define("Treatment", {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: "Treatment name must be between 1 and 255 characters"
        }
      }
    },
    acute: {
      type: Datatypes.BOOLEAN,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  Treatment.associate = function(models) {

    Treatment.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false,
        defaultValue: 1
      }
    });

  	Treatment.hasMany(models.Dose, {
  		onDelete: 'CASCADE',
  		as: 'Doses'
  	});

    Treatment.belongsToMany(models.Migraine, {
      through: {model: models.MigraineTreatment}
    });
    
    Treatment.belongsToMany(models.User, {
    	through: {model: models.UserTreatment}
    });
  }

  return Treatment;
}