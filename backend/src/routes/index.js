const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRouter')
const paymentRouter = require('../MercadoPago/handlers/routes/payment')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use("/mercadopago", paymentRouter)

module.exports = router;
