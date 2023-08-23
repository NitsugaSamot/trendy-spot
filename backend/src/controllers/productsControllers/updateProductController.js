const { Product } = require("../../db");

const updateProductController = async (product) => {
    const { id, name, price, description, brand, stock } = product;

    try {
        await Product.update({
            name: name,
            price: price,
            description: description,
            brand: brand,
            stock: stock
        }, {
            where: { id: id }
        });

        return { message: "Product updated successfully." };

    } catch (error) {
        console.error("Error updating the product:", error);
        throw new Error("Failed to update product");
    }
}

module.exports = updateProductController;

/* id: showProduct.id,
      name: productEdit.name,
      price: productEdit.price,
      description: productEdit.description,
      brand: productEdit.brand,
      stock: st */

/* try {
    const userDeleted = req.body;
const { id, isDeleted } = userDeleted
const deleted = await User.update({ isDeleted: true },
    {
      where: {
        id: id
      }
    })
res.status(200).json(deleted)
}catch(error){
    console.log({error: error})
} */