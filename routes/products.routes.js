const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");

const router = express.Router();

//get all products
router.get("/", getAllProducts);

//get one product
router.get("/:id", getProduct);

//post one product
router.post("/", createProduct);

//delete one product
router.delete("/:id", deleteProduct);

//update one product
router.put("/:id", updateProduct);

module.exports = router;
