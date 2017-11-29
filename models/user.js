module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    username: {
    	type: DataTypes.STRING(40),
    	allowNull: false,
    	validate: {
    		len: {
    			args: [3, 40],
    			msg: "The user name must have between 3 and 40 characters"
    		}
    	}
    },
    email: {
    	type: DataTypes.STRING,
    	validate: {
    		isEmail: {
    			args: true,
    			msg: "The email must be in a valid format"
    		}
    	}
    }
    gender: {
    	type: DataTypes.STRING(20),

    },
    age: {
    	type: DataTypes.INTEGER(4),
    },
    location: {
    	type: DataTypes.STRING(40),
    }
  });

  User.associate = function(models) {
  	User.hasMany(models.Migraine, {
  		onDelete: "CASCADE",
  		as: "Migraines"
  	});
  };

  User.associate = function(models) {
  	User.hasMany(models.Treatment, {
  		as: "Treatments"
  	});
  };

  return User;
}