const { Router } = require('express');
const controller = require('../controller/orders');

const router = Router();

// aqui vai as requisições
router.get("/", controller.getAllOrders);
router.post("/", controller.createOrder);
router.get("/:id", controller.getOrderId);
router.put("/:id", controller.updateOrderId);
router.delete("/:id", controller.deleteOrderId);

module.exports = router;