const{ Product } = require('../db')

// http://localhost:3004/products

const getAllProducts = async(req, res) => {
    try {
        const products = await Product.findAll()

        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}


// http://localhost:3004/products/create

const postProduct = async (req, res) => {
        try {
                const {name, size, price, image, description, stock, brand} = req.body
            
                const product = await Product.create({
                    name,
                    size,
                    price,
                    image,
                    description,
                    stock, 
                    brand
                })
            
                res.status(200).json(product)
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log(error);
        }
}

const getProductById = async(req, res) => {
    const {id} = req.params 

    try {
        const productId = await Product.findOne({where: {id}})

        return res.json(productId)

    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }

}

module.exports = {postProduct, getAllProducts, getProductById}