const express = require("express");
const router = express.Router();

// Controllers
const {
  getUserById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  userPurchaselist,
} = require("../controllers/user");
const { isSignedin, isAuthenticated, isAdmin } = require("../controllers/auth");

// express validator
const { check } = require("express-validator");

router.get("/users", allUsers);
router.get("/user/:userId", isSignedin, isAuthenticated, getUser);
router.put("/user/:userId", isSignedin, isAuthenticated, updateUser);
router.delete("/user/:userId", isSignedin, isAuthenticated, deleteUser);
router.get(
  "/orders/user/:userId",
  isSignedin,
  isAuthenticated,
  userPurchaselist
);

// Any route containing  :userid  our app will first execute userById
router.param("userId", getUserById);

module.exports = router;
