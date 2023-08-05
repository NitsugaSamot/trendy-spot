const {Router}=require('express')
const router = Router()

const newProductHandler = require('../handlers/product/createProductHandler')
const { getAllOrByNameProducts, getProductById } = require('../handlers/product/getProductHandlers');

const {filterProductsByPriceRange} = require('../controllers/productsControllers/filterProducts')

// const {getAllBrands} = require('../controllers/brandsControllers/createBrand')

const validation = require('../helpers/validation')
// const  { postProduct, getAllProducts, getProductById } = require('../controllers/createProductController')


router.get('/', getAllOrByNameProducts)
router.get('/name?', getAllOrByNameProducts)
router.get('/search', filterProductsByPriceRange);
router.get('/:id', getProductById)
// router.get('/brands', getAllBrands)


  

router.post('/create', validation, newProductHandler)

module.exports = router