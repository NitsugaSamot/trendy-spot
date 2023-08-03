const {Router}=require('express')
const router = Router()

const newProductHandler = require('../handlers/product/createProductHandler')
const { getAllOrByNameProducts, getProductById } = require('../handlers/product/getProductHandlers');
// const  { postProduct, getAllProducts, getProductById } = require('../controllers/createProductController')

// const validate = (req, res, next) => {
//     const  {name, img, hp, attack, defense, types} = req.body;
//     if(!name || !img || !hp || !attack || !defense || !types){
//         res.status(400).json({error: "Missing data"});
//     }
//     next();
// };

router.get('/', getAllOrByNameProducts)
router.get('/name?', getAllOrByNameProducts)
router.get('/:id', getProductById)

router.post('/create', newProductHandler)

module.exports = router