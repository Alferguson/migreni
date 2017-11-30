module.exports = function(sequelize, Datatypes) {
  var Dose = sequelize.define("Dose", {
  	value: {
  		type: Datatypes.DECIMAL,
  		allowNull: false,
  		validate: {
  			len: {
  				args: [1],
  				msg: "Dose value cannot be empty."
  			}
  		}
  	},
  	unit: {
  		type: Datatypes.STRING(20),
  		allowNull: false,
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

  Dose.associate = function(models) {
  	Dose.belongsTo(models.Treatment, {
  		allowNull: false
  	}); 
  };

  return Dose;
};