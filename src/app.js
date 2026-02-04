const express = require("express");
const app = express();
const path = require("path");
const studenRoute = require("./routes/studentRoutes");
const authRoute = require("./routes/authRoute");
const errHandler = require("./utils/errorHandler");
const chatRoute = require("./routes/chatRoute");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use("/api/students", studenRoute);
app.use("/auth", authRoute);
app.use("/api", chatRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errHandler);

module.exports = app;
