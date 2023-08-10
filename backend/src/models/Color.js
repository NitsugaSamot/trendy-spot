const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "color",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      namecolor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
