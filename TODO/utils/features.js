const jwt = require("jsonwebtoken");

const NODE_ENV = "development";

exports.sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign(
    { _id: user._id },
    "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
  );

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: NODE_ENV === "development" ? "lax" : "none",
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
