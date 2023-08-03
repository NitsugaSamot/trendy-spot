const { Product } = require('../../db')
const { searchProductsByName, getDBinfo } = require('../../controllers/productsControllers/getProductsControllers')
// http://localhost:3004/products
const getAllOrByNameProducts = async(req, res) => {
    const { name } = req.query;
    const results = name ? await searchProductsByName(name) : await getDBinfo();
    res.status(200).json(results);
};

const getProductById = async(req, res) => {
    const {id} = req.params 
    try {
        const productId = await Product.findOne({where: {id}})
        return res.status(200).json(productId)
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};



module.exports = { getAllOrByNameProducts, getProductById };