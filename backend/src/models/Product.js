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
      validate: {
        len: [3, 50], // solo permite entre 3 y 50 caracteres.
        notNull: {
          msg: 'Product name is required'
        }
      }
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [1, 5], // solo permite un talle entre 0 y 5 caracteres.
        notNull: {
          msg: 'Product size is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        // len: [100, 100.000], // solo va permitir un precio entre 100 y 100.000.
        min: 100, // Precio mínimo
        max: 100000, // Precio máximo
        isNumeric: true, // solamente tiene que ser de tipo numerico.
        notNull: {
          msg: 'Product price is required'
        }
      }
    },  
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product image is required'
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product description is required'
        },
        len: [5, 500] // La cantidad de caracteres solo sera entre 5 y 500 caracteres
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0 // Asegurar que el stock no sea negativo
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isAlpha: true, // Solo permite letras.
      }
    },
    productbrand: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { timestamps: false }
  );
};

  