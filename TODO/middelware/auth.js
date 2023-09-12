const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      sucess: false,
      message: "login first",
    });
  }

  const decode = jwt.verify(
    token,
    "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
  );
  req.user = await User.findById(decode._id);
  next();
};
