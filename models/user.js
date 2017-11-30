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
    password_hash: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,
      set: function(val) {
        // Remember to set the data value, otherwise it won't be validated
        this.setDataValue('password', val);
        this.setDataValue('password_hash', this.salt + val);
      },
      validate: {
        isLongEnough: function(val) {
          if (val.length < 7) {
            throw new Error("Please choose a longer password")
          }
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