const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },  
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING(500)),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productbrand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stock: {
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  { timestamps: false }
  );
};