const createProduct = require('../../controllers/productsControllers/createProductController');

const newProductHandler = async (req, res) => {
    const {name, price, image, description, brand, stock } = req.body;
    const arrayImg = Object.values(image)
    try {
        const newProduct = await createProduct(name, price, arrayImg, description, brand, stock);
        res.status(200).json(newProduct);
    } catch (error){
        res.status(404).json({error: error.message});
    };
};

module.exports = newProductHandler;