require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./DB/connectDB");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4500"],
    // origin: "*",
  })
);

const productRoutes = require("./routes/product.routes");
// const authRoutes = require("./routes/auth.routes");
// const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const ownerRoutes = require("./routes/owner.routes");
// const reviewRoutes = require("./routes/review.routes");
// const addressRoutes = require("./routes/address.routes");
// const paymentRoutes = require("./routes/payment.routes");
// const orderRoutes = require("./routes/order.routes");
// const searchRoutes = require("./routes/search.routes");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/errorHandler");

app.get("/api/v1/amazon", (req, res) => {
  res.send("Welcome to the Amazon API");
});

// app.use("/api/v1/amazon_like/auth", authRoutes);
// app.use("/api/v1/amazon/products", productRoutes);
app.use("/api/v1/amazon/products", productRoutes);
app.use("/api/v1/amazon/categories", categoryRoutes);
app.use("/api/v1/amazon/owners", ownerRoutes);

// app.use("/api/v1/amazon/users", userRoutes);

// app.use("/api/v1/amazon/reviews", reviewRoutes);
// app.use("/api/v1/amazon/addresses", addressRoutes);
// app.use("/api/v1/amazon/payments", paymentRoutes);
// app.use("/api/v1/amazon/orders", orderRoutes);
// app.use("/api/v1/amazon/searchs", searchRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
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
