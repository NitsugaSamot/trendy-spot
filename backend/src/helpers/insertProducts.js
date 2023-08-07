const createProduct = require('../controllers/productsControllers/createProductController');

const insertProduct = async (products) => {
    const productsList = await products.map(async({name, size, price, image, description, stock, color, brand}) => {
        await createProduct(name, size, price, image, description, stock, color, brand)
        return {
            name,
            size,
            price,
            image,
            description,
            stock,
            color, 
            brand
        }
    })
    return productsList
}

module.exports = insertProduct;