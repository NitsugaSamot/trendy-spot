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

const getAllBrands = async (req, res) => {
    const brands = await Brand.findAll();
  
    if (brands.length > 0) {
      const uniqueBrandsSet = new Set(brands.map((brand) => brand.name));
      const uniqueBrands = Array.from(uniqueBrandsSet);
      return res.status(200).json(uniqueBrands);
    }
  
    return res.status(200).json([]);
  };
  

module.exports ={ createBrand, getAllBrands };


