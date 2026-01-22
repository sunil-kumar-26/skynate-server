const mongoose = require("mongoose");

async function connectMongoDB(dbString) {
  try {
    const db=await mongoose.connect(dbString);
    console.log("mongoDB connected successfully",db.connection.host);
  } catch (err) {
    console.error("mongoDB connection Er", err.message);
    process.exit(1);
  }
}

module.exports=connectMongoDB;
