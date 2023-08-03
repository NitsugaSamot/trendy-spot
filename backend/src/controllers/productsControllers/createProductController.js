const{ Product } = require('../../db');
const createBrand = require('../brandsControllers/createBrand');

// http://localhost:3004/products/create
const createProduct = async (name, size, price, image, description, stock, color, brand) => {
    const brandResult = await createBrand(brand);
    const product = await Product.create({
        name,
        size,
        price,
        image,
        description,
        stock,
        color,
        brand,
        brandId: brandResult.id,
        productbrand: brand
    });
    const objectProduct = {
        ...product.dataValues,
        brand
    };
    return objectProduct;
};


module.exports = createProduct;