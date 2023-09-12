const express = require("express");
const {
  register,
  login,
  getallusers,
  getMyProfile,
  logout,
} = require("../controllers/user");
const { isAuthenticated } = require("../middelware/auth");

const router = express.Router();

router.get("/all", getallusers);
router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getMyProfile);

module.exports = router;
