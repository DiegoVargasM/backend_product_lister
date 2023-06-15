const Product = require("../models/product.model");
//para verificar si el id es valido
const mongoose = require("mongoose");

//get all products
const getAllProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(products);
};

//get one product
const getProduct = async (req, res) => {
  const { id } = req.params;
  //verificar si el id es valido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Product not found" });
  }

  const product = await Product.findById(id);

  //si no existe el producto devolver un error
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  //si existe devolver el producto
  res.status(200).json(product);
};

//create one product
const createProduct = async (req, res) => {
  const { product_name, amount, category, aditional_info } = req.body;

  let emptyFields = [];
  if (!product_name) emptyFields.push("product_name");
  if (!amount) emptyFields.push("amount");
  if (!category) emptyFields.push("category");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: `Te falta completar las siguientes entradas obligatorias: ${emptyFields.join(
        ", "
      )}`,
      emptyFields,
    });
  }

  try {
    const product = await Product.create({
      product_name,
      amount,
      category,
      aditional_info,
    });
    res.status(200).json({ product });
    console.log("new product added to db", product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete one product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  //verificar si el id es valido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Product not found" });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  //si no existe el producto devolver un error
  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }
  res.status(200).json(product);
};

//update one product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  //verificar si el id es valido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Product not found" });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  //si no existe el producto devolver un error
  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }

  res.status(200).json(product);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
