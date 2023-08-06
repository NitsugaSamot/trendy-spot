const { Brand } = require('../../db'); 
const { Op } = require("sequelize");

const createBrand = async (brandName) => {
    const existing = await Brand.findOne({where: {name: {[Op.iLike]: `%${brandName}%`}}})
    if(!existing){
        const newBrand = await Brand.create({
            name: brandName
        })
        return newBrand.dataValues;
    }
    return existing;   
};

module.exports = createBrand;