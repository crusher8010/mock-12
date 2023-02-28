const express = require("express");

const { postProduct, getProducts, buyProducts } = require("../Controller/productController");

const Router = express.Router();

Router.route("/products").get(getProducts).post(postProduct);
Router.route("/buyProduct/:id").delete(buyProducts);

module.exports = Router;