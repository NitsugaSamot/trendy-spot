
const updateProductController = require('../../controllers/productsControllers/updateProductController')

const updateProduct = async(req,res) =>{
    const product = req.body;
    try {
        const response = await updateProductController(product);
        res.status(200).json(response);
        }catch(error){
        res.status(400).json({error: error.message})
        }
        
}

module.exports = updateProduct