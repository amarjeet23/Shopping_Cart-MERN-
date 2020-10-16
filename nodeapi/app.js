require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var cors = require('cors')

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

// unauthorised error handling in protected route
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }
});

// Mongodb connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Require Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");


// Routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", categoryRoutes);
app.use("/", productRoutes);


// Port Connection

const port = 4000;
app.listen(port, () => {
  console.log(`app is listening at ${port}`);
});
