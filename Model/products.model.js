const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    gifUrl: { type: String },
    bodyPart: { type: String },
    equipment: { type: String },
    name: { type: String },
    target: { type: String }
  },
  {
    versionKey: false,
  }
);
const ProductModel = mongoose.model("products", productSchema);

module.exports = ProductModel;
