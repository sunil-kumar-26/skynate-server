const express = require("express");
const app = express();
const path = require("path");
const studenRoute = require("./routes/studentRoutes");
const authRoute = require("./routes/authRoute");
const errHandler = require("./utils/errorHandler");
const chatRoute = require("./routes/chatRoute");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://skynateai.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(
          new Error("CORS not allowed for this origin: " + origin),
        );
      }
    },
    credentials: true,
  }),
);

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
