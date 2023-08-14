const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },  
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productbrand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    averageRating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  { timestamps: false });

  Product.associate = (models) => {
    Product.hasMany(models.rating); // Establece la relación uno a muchos con las valoraciones
  };

  return Product;
};

  