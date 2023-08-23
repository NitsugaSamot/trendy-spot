const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER, 
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    token: {
      type: DataTypes.STRING
    },
    confirmated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    purchaseOrder: {
      type: DataTypes.JSON,
      defaultValue:[],
    },
  },
  {
    timestamps: false
  });

  User.prototype.addBuy = function(id, name, price,quantity, description) {
    const buys = { id:id, title: name,unit_price: price, quantity: quantity, description: description,};
    const purchases = [...this.purchaseOrder, buys];

    return this.update({ purchaseOrder: purchases });
  };

  // Antes de crear o actualizar un usuario, vamos a hashear su contraseña
  User.beforeCreate(async (user) => {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.prototype.checkPassword = async function(passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
  };

  return User;
};


 