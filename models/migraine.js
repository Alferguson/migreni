module.exports = function(sequelize, DataTypes) {
	var Migraine = sequelize.define("Migraine", {
		intensity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: {
					args: 1,
					msg: "The intensity must be at least 1"
				},
				max: {
					args: 10,
					msg: "The Intensity must be at most 10"
				}
			}
		},
		location: {
			type: DataTypes.STRING,
		},
		date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},

		trigger: {
			type: DataTypes.STRING,
		}
	});

	Migraine.associate = function(models) {
		// Migraine model has a one to one relationship with Weather model, one to one relationship with User model and many to many relationship with Treatment model
		Migraine.hasOne(models.Weather, {
			foreignKey: {
				allowNull: false
			}
		})
		Migraine.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});

		Migraine.belongsToMany(models.Treatment, {
			through: {model: models.MigraineTreatment}
		});
	};
	return Migraine;
}