const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller.js");
const multerMiddleware = require("../middleware/fileMidlleware");
// // const reviewController = require("../controllers/reviewController");
// // const authMiddleware = require("../middleware/authentication");

router.route("/").get(productController.getAllProducts).post(
  // multerMiddleware,
  // authMiddleware.authenticateUser,
  // authMiddleware.authorizePermissions("admin", "owner"),
  productController.createProduct
);

// router.post(
//   "/uploadImage",
//   // authMiddleware.authenticateUser,
//   authMiddleware.authorizePermissions("admin", "owner"),
//   productController.uploadImage
// );

// router
//   .route("/:id")
//   .get(productController.getSingleProduct)
//   .patch(
//     // authMiddleware.authenticateUser,
//     // authMiddleware.authorizePermissions("admin", "owner"),
//     productController.updateProduct
//   )
//   .delete(
//     // authMiddleware.authenticateUser,
//     // authMiddleware.authorizePermissions("admin", "owner"),
//     productController.deleteProduct
//   );

// // router.route("/:id/reviews").get(reviewController.getSingleProductReviews);

module.exports = router;
