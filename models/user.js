module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 40],
          msg: "The user name must have between 3 and 40 characters"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "The email must be in a valid format"
        }
      }
    },
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
  // User model has a one to many relationship with Migraine model and many to many relationship with Treatment model
  User.associate = function(models) {
    User.hasMany(models.Migraine, {
      onDelete: "CASCADE",
      as: "Migraines"
    });

    User.belongsToMany(models.Treatment, {
      through: { model: models.UserTreatment }
    });
  };
  return User;
}