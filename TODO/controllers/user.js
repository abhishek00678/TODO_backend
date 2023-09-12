const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendCookie } = require("../utils/features");
const NODE_ENV = "development";

// creating all apis here

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({
        success: false,
        message: "user already exits",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashpassword });

    sendCookie(user, res, "user register sucessfully", 201);
  } catch (error) {
    console.log(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "invalid email or password",
      });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "invalid email or password",
      });
    }

    sendCookie(user, res, `Welcome mr/ms ${user.name}`, 200);
  } catch (error) {
    console.log(error);
  }
};
exports.getallusers = (req, res) => {};
exports.getMyProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: NODE_ENV === "development" ? "lax" : "none",
        secure: NODE_ENV === "development" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
  } catch (error) {
    console.log(error);
  }
};
