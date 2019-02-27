"use strict";
module.exports = (sequelize, DataTypes) => {
  const dog = sequelize.define(
    "dog",
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      birthday: DataTypes.DATE,
      breed: DataTypes.STRING,
      gender: DataTypes.STRING,
      bio: DataTypes.TEXT
    },
    {}
  );
  dog.associate = function(models) {
    // associations can be defined here
    associate: function(models) {
      models.dog.belongsTo(models.user);
    }
  };
  return dog;
};
