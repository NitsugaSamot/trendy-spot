const { Product } = require("../../db");
const {createBrand} = require("../brandsControllers/createBrand");
/* name, price, image, description, brand, stock */
// http://localhost:3004/products/create
const createProduct = async ( name, price, image, description, brand, stock ) => {
  const brandResult = await createBrand(brand);
  const product = await Product.create({ name, price, image, description, brandId: brandResult.id, productbrand: brand, stock });
  const objectProduct = {...product.dataValues, brand };
  return objectProduct;
};

module.exports = createProduct;