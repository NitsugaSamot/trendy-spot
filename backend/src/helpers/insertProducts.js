const createProduct = require('../controllers/productsControllers/createProductController');

const insertProduct = async (products) => {
    const productsList = await products.map(async({name, price, image, description, brand, stock}) => {
        await createProduct(name, price, image, description, brand, stock)
        return { name, price, image, description, brand, stock }
    })
    return productsList
}

module.exports = insertProduct;