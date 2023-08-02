const{ Product } = require('../db')

const postProduct = async (req, res) => {
        try {
                const {name, size, price, image, description, stock} = req.body
            
                const product = await Product.create({
                    name,
                    size,
                    price,
                    image,
                    description,
                    stock
                })
            
                res.status(200).json(product)
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log(error);
        }
}

module.exports = {postProduct}