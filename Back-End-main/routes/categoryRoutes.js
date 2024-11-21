const express = require("express");
const router = express.Router();

const {
  getCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryControlles");

// Routes
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
