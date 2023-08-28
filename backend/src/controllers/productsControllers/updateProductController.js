const { Product } = require("../../db");
const validationProduct1 = require('../../helpers/validationProduct1');
const validationStock = require('../../helpers/validationStock');

const updateProductController = async (product) => {
    const { id, name, price, description, stock } = product;
    const form = { price, description };
    const error1 = validationProduct1(form);
    console.log(stock)
    const error2 = validationStock(stock)
    

        if (Object.values(error1).length !== 0) {
            console.log("The product validation failed error1");
            if (error1.price) {
                throw new Error(error1.price);
            }
            if (error1.description) {
                throw new Error(error1.description);
            }
        }
        
        if (Object.values(error2).length !== 0) {
            console.log("The product validation failed error2");
            throw new Error(error2.stock);
        }

        await Product.update({ name, price, description, stock }, { where: { id } });
        return { message: "Product updated successfully." };

}

module.exports = updateProductController;