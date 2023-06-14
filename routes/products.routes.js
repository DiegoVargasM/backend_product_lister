const express = require("express");

const router = express.Router();

//get all products
router.get("/", (req, res) => {
  res.json({ mssg: "get all products" });
});

//get one product
router.get("/:id", (req, res) => {
  res.json({ mssg: "get one product" });
});

//post one product
router.post("/", (req, res) => {
  res.json({ mssg: "post one product" });
});

//update one product
router.put("/:id", (req, res) => {
  res.json({ mssg: "update one product" });
});

module.exports = router;
