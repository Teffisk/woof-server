"use strict";
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define(
    "review",
    {
      locationId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      images: DataTypes.ARRAY(DataTypes.STRING),
      qualityRating: DataTypes.INTEGER,
      dogFriendlinessRating: DataTypes.INTEGER,
      tags: DataTypes.ARRAY(DataTypes.STRING),
      description: DataTypes.TEXT
    },
    {}
  );
  review.associate = function(models) {
    // associations can be defined here
    models.review.belongsTo(models.user);
  };
  return review;
};
