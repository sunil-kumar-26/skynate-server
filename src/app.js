const express = require("express");
const app = express();
const studenRoute = require("./routes/studentRoutes");
const authRoute = require("./routes/authRoute");
const errHandler = require("./utils/errorHandler");

app.use(express.json());

// app.use("/api/students", studenRoute);

app.use("/api/user/auth", authRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errHandler);

module.exports = app;
