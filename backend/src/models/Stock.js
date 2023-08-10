const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "stock",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nameproductid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
      },
      namecolorid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "color",
          key: "id",
        },
      },
      namesizeid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "size",
          key: "id",
        },
      },
      stock: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
