const express = require("express");
const ProductRoute = express.Router();
const ProductModel = require("../Model/products.model");
const { auth } = require("../Middleware/auth.middleware");

ProductRoute.get("/", async (req, res) => {
    try {
      const product = await ProductModel.find();
      res.status(200).send({ products: product });
    } catch (err) {
      res.status(400).send({ err: err.message });
    }
  });
  
  ProductRoute.get("/:equipment", async (req, res) => {
    let filters = { equipment: req.params.equipment };
    console.log(req.query)
    if (req.query.name) {
      filters.name = { $regex: req.query.name, $options: "i" };
    }
    try {
      let filteredProduct = await ProductModel.find(filters)
      res.status(200).send({ products: filteredProduct });
  
    } catch (err) {
      res.status(400).send({ err: err.message });
    }
  });
   
  module.exports = { ProductRoute };