const express = require("express");
const router = express.Router();
// const authentication = require("../middleware/authentication");
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.delete(
  "/logout",
  //   authentication.authenticateUser,
  authController.logout
);
router.post("/verifyEmail", authController.verifyEmail);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword", authController.resetPassword);

module.exports = router;
