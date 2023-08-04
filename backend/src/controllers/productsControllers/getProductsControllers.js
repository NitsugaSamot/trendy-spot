const { Product } = require('../../db');
const { Op } = require('sequelize');
const insertProduct = require('../../helpers/insertProducts');
const products = require('../../helpers/productsObject')

const searchProductsByName = async (name) => {
    const dbProducts = await Product.findAll({where: {name: {[Op.iLike]: `%${name}%`}}});
    if(!dbProducts.length){
        return `No se encontró producto con el nombre: ${name}`
    }
    return dbProducts;
};

const getDBinfo = async () => {
    const DB = await Product.findAll();
    if(!DB.length){
        return insertProduct(products)
    };
    return DB
}

module.exports = { searchProductsByName, getDBinfo }