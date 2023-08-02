const {Router}=require('express')

const router = Router()

const  {postProduct, getAllProducts} = require('../controllers/productController')


router.get('/', getAllProducts)

//Creación de producto
router.post('/create', postProduct)


module.exports = router