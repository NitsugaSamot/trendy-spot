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


module.exports ={ createBrand };



//const getAllBrands = async (req, res) => {
//     const brands = await Brand.findAll()

//     if (brands.length > 0) {
//         const allBrands = brands.map((brand) => brand.name);
//         return res.status(200).json(allBrands);
//       }

//       return res.status(200).json(allBrands)
// }
