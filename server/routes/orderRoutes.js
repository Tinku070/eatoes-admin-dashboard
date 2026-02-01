const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// GET all orders (pagination + status filter)
router.get("/", orderController.getAllOrders);

// GET single order (populate menu items)
router.get("/:id", orderController.getOrderById);

// CREATE order
router.post("/", orderController.createOrder);

// UPDATE order status
router.patch("/:id/status", orderController.updateOrderStatus);

module.exports = router;
