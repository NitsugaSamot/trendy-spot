const { Router } = require('express');
const router = Router();

const newProductHandler = require('../handlers/product/createProductHandler');
const { getAllOrByNameProducts, getProductById } = require('../handlers/product/getProductHandlers');
const { filterProductsByPriceRange, filterByBrands, filterProducts } = require('../controllers/productsControllers/filterProducts');
const { getAllBrands } = require('../controllers/brandsControllers/createBrand');
const validation = require('../helpers/validation');
const { getAverageRating, createRating } = require('../handlers/product/ratingHandlers');
const { checkAuth } = require('../middleware/checkAuth');
const { getRatingsByProduct } = require('../controllers/productsControllers/getRatingsByProduct');

router.get('/', getAllOrByNameProducts);
router.get('/name?', getAllOrByNameProducts);
router.get('/filter', filterProductsByPriceRange);
router.get('/brands', getAllBrands);
router.get('/filter?', filterProducts);
router.get('/:id', getProductById);
router.get('/brands/:brandName', filterByBrands);

// Rutas de valoración después de las rutas de filtrado
router.get('/:productId/ratings', getRatingsByProduct);
router.get('/:productId/average-rating', getAverageRating);

router.post('/create', validation, newProductHandler);
router.post('/:productId/ratings', checkAuth, createRating);

module.exports = router;
