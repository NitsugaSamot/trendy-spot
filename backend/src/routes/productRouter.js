const {Router}=require('express')

const router = Router()

const  {postProduct} = require('../controllers/productController')

//Creación de producto
router.post('/', postProduct)


module.exports = router