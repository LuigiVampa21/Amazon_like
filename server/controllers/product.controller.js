const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const path = require("path");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(StatusCodes.OK).json({
    results: products.length,
    products,
  });
};

exports.createProduct = async (req, res) => {
  //   const { userID } = req.user;
  //   req.body.user = userID;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({
    product,
  });
};

// exports.getSingleProduct = async (req, res) => {
//   const productsID = req.params.id;
//   const product = await Product.findById(productsID).populate("reviews");
//   if (!product) {
//     throw new CustomError.NotFoundError("No product found with that id");
//   }
//   res.status(StatusCodes.OK).json({
//     product,
//   });
// };

// exports.updateProduct = async (req, res) => {
//   const productsID = req.params.id;
//   const product = await Product.findByIdAndUpdate(productsID, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!product) {
//     throw new CustomError.NotFoundError("No product found with that id");
//   }
//   res.status(StatusCodes.OK).json({
//     product,
//   });
// };

// exports.deleteProduct = async (req, res) => {
//   const productsID = req.params.id;
//   const product = await Product.findById(productsID);
//   if (!product) {
//     throw new CustomError.NotFoundError("No product found with that id");
//   }
//   await product.remove();
//   res.status(StatusCodes.OK).json({
//     data: null,
//   });
// };

// exports.uploadImage = async (req, res) => {
//   console.log(req.files);
//   if (!req.files) {
//     throw new CustomError.BadRequestError("No image found");
//   }
//   const { mimetype, size, name, mv } = req.files.image;
//   if (!mimetype.startsWith("image")) {
//     throw new Error("Please upload an image");
//   }
//   const maxSizeImg = 1024 * 1024;
//   if (size > maxSizeImg) {
//     throw new CustomError.BadRequestError(
//       "Please upload image smaller than 1MB"
//     );
//   }
//   const imagePath = path.join(__dirname, "../public/uploads/" + name);
//   await mv(imagePath);
//   res.status(StatusCodes.OK).json({
//     image: `uploads/${name}`,
//   });
// };
