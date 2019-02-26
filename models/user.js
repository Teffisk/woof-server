"use strict";
var bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8, 20],
            msg: "Password must be between 8 and 20 characters in length."
          }
        }
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      image: {
        type: DataTypes.STRING,
        default: "https://i.imgur.com/mCHMpLT.png?3"
      }
    },
    {
      hooks: {
        beforeCreate: function(pendingUser) {
          if (pendingUser && pendingUser.password) {
            var hash = bcrypt.hashSync(pendingUser.password, 12);
            pendingUser.password = hash;
          }
        }
      }
    }
  );
  user.associate = function(models) {
    // associations can be defined here
  };
  user.prototype.validPassword = function(typedPassword) {
    return bcrypt.compareSync(typedPassword, this.password);
  };
  return user;
};
