const { Router } = require("express");
const placeOrder = require("../handlers/placeOrder");
const successfulPayment = require("../handlers/success");
const {savePurchases} = require('../../../controllers/usersControllers/purchaseController')


const paymentRouter = Router();

// Definir una ruta POST para realizar una orden de compra
// Cuando se reciba una solicitud POST en "/order", se ejecutará el manejador placeOrder
paymentRouter.post("/order", placeOrder);

paymentRouter.post('/:id/purchases', savePurchases);


// Definir una ruta GET para el éxito del pago
// Cuando se reciba una solicitud GET en "/success", se ejecutará el manejador successfulPayment
paymentRouter.get("/success", successfulPayment);

// Exportar el enrutador para que pueda ser utilizado en otros lugares del código
module.exports = paymentRouter;
