const { Router } = require("express");
const successfulPayment = require("../success");
const placeOrder = require("../placeOrder")

const paymentRouter = Router();
paymentRouter.post("/order", placeOrder);
paymentRouter.get("/success", successfulPayment);

module.exports = paymentRouter;