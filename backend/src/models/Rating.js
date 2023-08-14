const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('rating', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    // ... otras columnas si es necesario
  },
  { timestamps: true });

  return sequelize.models.rating;
};
