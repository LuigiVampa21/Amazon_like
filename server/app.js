require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./DB/connectDB");

app.use(cors);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(notFound);
app.use(errorHandler);

const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const ownerRoutes = require("./routes/owner");
const userRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/review");
const addressRoutes = require("./routes/address");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/order");
const searchRoutes = require("./routes/search");

app.get("/api/v1/", (req, res) => {
  res.status(200).json({
    data: "Welcome to the Amazon_like API",
  });
});
app.use("api/v1/amazon_like/auth", authRoutes);
app.use("api/v1/amazon_like/product", productRoutes);
app.use("api/v1/amazon_like/category", categoryRoutes);
app.use("api/v1/amazon_like/owner", ownerRoutes);
app.use("api/v1/amazon_like/user", userRoutes);
app.use("api/v1/amazon_like/review", reviewRoutes);
app.use("api/v1/amazon_like/address", addressRoutes);
app.use("api/v1/amazon_like/payment", paymentRoutes);
app.use("api/v1/amazon_like/order", orderRoutes);
app.use("api/v1/amazon_like/search", searchRoutes);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
