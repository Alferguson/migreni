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
    },
    description: {
      type: Datatypes.TEXT
    },
    category: {
    	type: Datatypes.STRING(40),
    	allowNull: false,
      validate: {
        len: {
          args: [1, 40],
          msg: "Treatment category must be between 1 and 40 characters"
        }
      }
    }
  }, {
    timestamps: false
  });

  Treatment.associate = function(models) {
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