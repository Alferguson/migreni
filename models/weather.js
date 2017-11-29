module.exports = function(sequelize, DataTypes) {
	var Weather = sequelize.define("Weather", {
		temp: DataTypes.DECIMAL,
		temp_min: DataTypes.DECIMAL,
		temp_max: DataTypes.DECIMAL,
		humidity: DataTypes.INTEGER,
		pressure: DataTypes.DECIMAL,
		sea_level: DataTypes.DECIMAL,
		grnd_level: DataTypes.DECIMAL,
	});

	Weather.associate = function(models){
		Weather.belongsTo(models.Migraine, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Weather;
}
		