const {Router}=require('express')
const router = Router()

const newProductHandler = require('../handlers/product/createProductHandler')
const { getAllOrByNameProducts, getProductById } = require('../handlers/product/getProductHandlers');
const {filterProductsByPriceRange, filterByBrands, filterProducts} = require('../controllers/productsControllers/filterProducts')
const {getAllBrands} = require('../controllers/brandsControllers/createBrand');
const updateProduct = require('../handlers/product/updateProductHandler');
// const validation = require('../helpers/validation')



router.get('/', getAllOrByNameProducts)
router.get('/name?', getAllOrByNameProducts)
// router.get('/search', filterProductsByPriceRange);
router.get('/brands', getAllBrands);
router.get('/filter?', filterProducts);
router.get('/:id', getProductById)
router.put('/updateProduct', updateProduct)

router.get('/brands', getAllBrands)
router.get('/brands/:brandName', filterByBrands);

router.post('/create', newProductHandler)

module.exports = router