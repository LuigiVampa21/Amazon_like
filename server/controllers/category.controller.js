const Category = require("../models/Category.model");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(StatusCodes.OK).json({
    categories,
  });
};

exports.createCategory = async (req, res) => {
  const { type } = req.body;
  console.log(req.body);
  const category = await Category.create({ type });
  res.status(StatusCodes.OK).json({
    category,
  });
};
