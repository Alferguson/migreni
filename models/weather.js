// values should be copied from https://openweathermap.org/weather-data
// Should use standard unit measurment for request to api
module.exports = function(sequelize, DataTypes) {
	var Weather = sequelize.define("Weather", {
		temp: DataTypes.DECIMAL,
		temp_min: DataTypes.DECIMAL,
		temp_max: DataTypes.DECIMAL,
		humidity: DataTypes.INTEGER,
		pressure: DataTypes.DECIMAL,
		sea_level: DataTypes.DECIMAL,
		grnd_level: DataTypes.DECIMAL,
		precip: DataTypes.DECIMAL
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
		