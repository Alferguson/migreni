module.exports = function(sequelize, Datatypes) {
  var Treatment = sequelize.define("Treatment", {
    treatment_name: {
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
    dose: {
      type: Datatypes.DECIMAL,
      allowNull: true,
      validate: {
        len: {
          args: [1],
          msg: "Dose value cannot be empty."
        }
      }
    },
    dose_unit: {
      type: Datatypes.STRING(20),
      allowNull: true,
      validate: {
        len: {
          args: [1],
          msg: "Dose unit cannot be empty."
        }
      }
    }
  }, {
    timestamps: false
  });

  Treatment.associate = function(models) {

    Treatment.belongsToMany(models.Migraine, {
      through: {model: models.MigraineTreatment}
    });
    
    Treatment.belongsToMany(models.User, {
    	through: {model: models.UserTreatment}
    });
  }

  return Treatment;
}