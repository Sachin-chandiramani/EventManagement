const express = require("express");
const {
  registerController,
  loginController,
  updateController,
  isSignedIn,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.put("/update-profile", isSignedIn, updateController);

module.exports = router;
