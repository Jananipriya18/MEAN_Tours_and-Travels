// const express = require("express");
// const mongoose = require("mongoose");
// // const bookRoutes = require("./routers/bookingRouter");
// const userRouter = require("./routers/userRouter");
// const bookingRouter = require("./routers/bookingRouter");
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const cors = require("cors"); // Import the cors package
// const corsOptions = {
//   origin: "*", // Replace with the URL of your frontend application
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: "Content-Type,Authorization",
// };


// // Enable CORS with the specified options
// app.use(cors(corsOptions));
// mongoose
//   .connect("mongodb://127.0.0.1:27017/findbookingdb")
//   .then(() => {
//     console.log("Database connected");
//     app.listen(8080, () => {
//       console.log("API is running in PORT:8080");
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//   app.use("/user", userRouter);
//   app.use("/booking", bookingRouter);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const bookingRouter = require("./routers/bookingRouter");
require('dotenv').config(); // To use environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Use environment variable for allowed origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type,Authorization",
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Routes
app.use("/user", userRouter);
app.use("/booking", bookingRouter);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack);
  console.error("Error message:", err.message);
  res.status(500).send('Something broke!');
});

// Database connection and server start
const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/findbookingdb")
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`API is running on PORT:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
