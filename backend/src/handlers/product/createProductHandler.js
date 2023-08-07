const createProduct = require('../../controllers/productsControllers/createProductController');

const newProductHandler = async (req, res) => {
    const { name, size, price, image, description, stock, color, brand } = req.body;
    try {
        const newProduct = await createProduct(name, size, price, image, description, stock, color, brand);
        res.status(200).json(newProduct);
    } catch (error){
        res.status(404).json({error: error.message});
    };
};

module.exports = newProductHandler;