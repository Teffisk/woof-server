"use strict";
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define(
    "location",
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      coordinates: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    {}
  );
  location.associate = function(models) {
    // associations can be defined here
  };
  return location;
};
