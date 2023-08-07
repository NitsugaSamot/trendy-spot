const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    //defino el modelo
    sequelize.define('brand', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, 
    {
      timestamps: false
    });
};

// Nike
// Adidas
// Puma
// Under Armour
// Reebok
// New Balance
// Asics
// Fila
// Converse 
// Skechers
// Champion
// Vans 
// Salomon
// Brooks
// Umbro
// Mizuno
// The North Face 
// Columbia Sportswear
// Decathlon 
// Li-Ning 