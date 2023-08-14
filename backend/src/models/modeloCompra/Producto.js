const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
    sequelize.define('producto', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },  
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { timestamps: false }
  );
};
