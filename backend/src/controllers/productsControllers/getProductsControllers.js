const { Product } = require('../../db');
const { Op } = require('sequelize');

const searchProductsByName = async (name) => {
    const dbProducts = await Product.findAll({where: {name: {[Op.iLike]: `%${name}%`}}});
    if(!dbProducts.length){
        return `No se encontró producto con el nombre: ${name}`
    }
    return dbProducts;
};

const getDBinfo = async () => {
    const DB = await Product.findAll();
    return DB
}

module.exports = { searchProductsByName, getDBinfo }