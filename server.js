require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/connectDB");

(async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log(`server is runing on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.log("Server crasehd Please see ERROR", err);
    console.error("Error", err);
  }
})();
