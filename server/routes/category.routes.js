const express = require("express")
const router = express.Router();

// POST request
router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);

module.exports = router;
