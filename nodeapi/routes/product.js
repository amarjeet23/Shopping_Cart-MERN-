const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
} = require("../controllers/product");
const { isSignedin, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// Params
router.param("userId", getUserById);
router.param("productId", getProductById);

// Actual Routes

// CREATE
router.post(
  "/product/create/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  createProduct
);

// GET
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// DELETE

router.get("/product/:productid", getProduct);
router.delete(
  "/product/:productId/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// UPDATE

router.put(
  "/product/:productId/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// LISTING

router.get("/products", getAllProducts);

module.exports = router;
