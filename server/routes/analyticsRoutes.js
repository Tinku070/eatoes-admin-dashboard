const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

router.get("/top-sellers", analyticsController.getTopSellers);

module.exports = router;
