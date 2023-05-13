const express = require("express");
const ProductRoute = express.Router();
const ProductModel = require("../Model/products.model");
const { auth } = require("../Middleware/auth.middleware");

ProductRoute.get("/", async (req, res) => {
  try {
    const product = await ProductModel.find();
    res.status(200).send({ products: product });
  } catch (err) {
    console.log(err, "line11")
    res.status(400).send({ err: err.message });
  }
});

ProductRoute.get("/:equipment", async (req, res) => {
  let filters = { equipment: req.params.equipment };
  console.log(req.query)
  // if (req.query.name) {
  //   filters.name = { $regex: req.query.name, $options: "i" };
  // }
  try {
    let filteredProduct = await ProductModel.find(filters)
    res.status(200).send(filteredProduct);

  } catch (err) {
    console.log(err, "line27")
    res.status(400).send({ err: err.message });
  }
});

ProductRoute.get("/:equipments/:id", async (req, res) => {
  const { id } = req.params
  console.log(req.query)
  // if (req.query.name) {
  //   filters.name = { $regex: req.query.name, $options: "i" };
  // }
  try {
    let filteredProduct = await ProductModel.findById({ _id: id })
    res.status(200).send(filteredProduct);

  } catch (err) {
    console.log(err, "line43")
    res.status(400).send({ err: err.message });
  }
});



ProductRoute.get("/:exercise/:target", async (req, res) => {
  let filters = { target: req.params.target };

  try {
    let filteredProduct = await ProductModel.find(filters)
    res.status(200).send(filteredProduct);

  } catch (err) {
    console.log(err, "line55")
    res.status(400).send({ err: err.message });
  }
});

ProductRoute.get("/exercise/:target/:id", async (req, res) => {

  const { id } = req.params
  console.log(id, "line66")
  try {
    let filteredProduct = await ProductModel.findById({ _id: id })
    res.status(200).send(filteredProduct);

  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});
module.exports = { ProductRoute };