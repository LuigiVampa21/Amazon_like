const mongoose = require("mongoose");
const User = require("../models/User.model");
// const Token = require("../models/tokenModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");
const { createJwt, attachCookiesToResponse } = require("../utils/jwt");
const hashString = require("../utils/createHash");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  // check if user already exists
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({ name, email, password, verificationToken });
  if (!user) {
    throw new CustomError.BadRequestError(
      "Sorry could not register, try again !"
    );
  }
  const origin = process.env.ORIGIN;
  await sendVerificationEmail(name, email, verificationToken, origin);

  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please check your email",
    data: user,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("No user found");
  }
  const passwordMatch = await user.comparePassword(req.body.password);
  if (!passwordMatch) {
    throw new CustomError.UnauthenticatedError("Incorrect password");
  }
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError(
      "Please verify your email to login"
    );
  }
  const token = createJwt({
    name: user.name,
    userID: user._id,
    role: user.role,
  });

  // create refresh token
  let refreshToken = "";

  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError("Invalid credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user, refreshToken });
    res.status(StatusCodes.OK).json({
      user,
      // tokenModel,
    });
    return;
  }

  // check for existing token
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, userAgent, ip, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user, refreshToken });
  res.status(StatusCodes.OK).json({
    user,
    // tokenModel,
  });
};

exports.logout = async (req, res) => {
  const userID = req.user.payload._id;
  const token = await Token.findOneAndDelete({ user: userID });
  res.cookie("accessToken", " ", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.cookie("refreshToken", " ", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({
    msg: "logout",
  });
};

exports.verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  if (!verificationToken) {
    throw new CustomError.BadRequestError("Sorry no token found");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError("Sorry no user found");
  }
  if (user.verificationToken != verificationToken) {
    throw new CustomError.BadRequestError("Sorry your token does not match");
  }
  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";
  await user.save();
  res.status(StatusCodes.OK).json({
    msg: "email verified",
    verificationToken,
    user,
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError("Please provide email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError("No user found with that email");
  }
  const passwordToken = crypto.randomBytes(70).toString("hex");

  await sendResetPasswordEmail({
    name: user.name,
    email: user.email,
    token: passwordToken,
    origin: process.env.ORIGIN,
  });

  const tenMinutes = 1000 * 60 * 10;
  const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
  user.passwordToken = hashString(passwordToken);
  user.passwordTokenExpirationDate = passwordTokenExpirationDate;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email to reset your password" });
};

exports.resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new CustomError.BadRequestError("Invalid credentials");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError("no user found with that email");
  }
  const currentDate = new Date();
  if (
    user.passwordToken === hashString(token) &&
    user.passwordTokenExpirationDate > currentDate
  ) {
    user.password = password;
    user.passwordToken = null;
    user.passwordTokenExpirationDate = null;
    await user.save();
  }
  res.status(StatusCodes.OK).json({ msg: "ok" });
};
