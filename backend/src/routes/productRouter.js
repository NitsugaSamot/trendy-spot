const {Router}=require('express')

const router = Router()

const  {postProduct, getAllProducts, getProductById} = require('../controllers/productController')


router.get('/', getAllProducts)

router.get('/:id', getProductById)

//Creación de producto
router.post('/create', postProduct)


module.exports = router