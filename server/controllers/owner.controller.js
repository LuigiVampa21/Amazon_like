const mongoose = require("mongoose");
const Owner = require("../models/Owner.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");

exports.getAllOwners = async (req, res) => {
  const owners = await Owner.find();
  res.status(StatusCodes.OK).json({
    results: owners.length,
    owners: owners,
  });
};

exports.createOwner = async (req, res) => {
  const { name, about } = req.body;
  //   const photo = req.file.location;

  // let owner = new Owner();
  // owner.name = req.body.name;
  // owner.about = req.body.about;
  // owner.photo = req.file.location;
  // await owner.save();

  //   const owner = await Owner.create({ name, about, photo });
  const owner = await Owner.create({ name, about });

  res.status(StatusCodes.OK).json({
    owner,
  });
};

// exports.getSingleOwner = async (req, res) => {
//   const { id } = req.params;

//   const owner = await Owner.findById(id);

//   res.status(StatusCodes.OK).json({
//     owner,
//   });
// };
