const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// GET all menu items + filters
router.get("/", menuController.getAllMenuItems);

// 🔍 SEARCH menu items (MUST be before :id)
router.get("/search", menuController.searchMenuItems);

// GET single menu item
router.get("/:id", menuController.getMenuItemById);

// CREATE menu item
router.post("/", menuController.createMenuItem);

// UPDATE menu item
router.put("/:id", menuController.updateMenuItem);

// DELETE menu item
router.delete("/:id", menuController.deleteMenuItem);

// TOGGLE availability
router.patch("/:id/availability", menuController.toggleAvailability);

module.exports = router;
