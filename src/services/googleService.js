const axios = require("axios");
require("dotenv").config();

const handleCallBack = async (req, res) => {
  const code = req.query.code;
  try {
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    return tokenRes;
  } catch (err) {
    console.error("See Error", err);
  }
};

const handleGoogleToken = async (idToken) => {
  const userInfo = await axios.get(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
  );
  if (userInfo.data.aud !== process.env.GOOGLE_CLIENT_ID) {
    return res.status(401).send("Invalid token");
  }
  return userInfo;
};

module.exports = {
  handleCallBack,
  handleGoogleToken,
};
