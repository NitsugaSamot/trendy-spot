const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "size",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      namesize: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
