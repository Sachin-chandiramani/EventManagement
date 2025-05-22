const {
  encryptPassword,
  comparePassword,
} = require("../helpers/authenticationHelpers");
const userModel = require("../models/userModel");
var jwt = require("jsonwebtoken");
var { expressjwt: exJwt } = require("express-jwt");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please enter all the details",
      });
    }
    if (password.length < 8 || password.length > 16) {
      return res.status(400).send({
        success: false,
        message: "PAssword should be between 8 to 16 characters",
      });
    }

    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    const encryptedPassword = await encryptPassword(password);

    await userModel({
      name,
      email,
      password: encryptedPassword,
    }).save();

    return res.status(200).send({
      success: true,
      message: "Registration is successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Please enter correct username and password",
      });
    }

    var token = jwt.sign({ id: user._id }, process.env.JWT_ENCRYPTION, {
      expiresIn: "7d",
    });

    user.password = undefined;

    return res.status(201).send({
      success: true,
      message: "User logged in!",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "User login failed",
      error,
    });
  }
};

const updateController = async (req, res) => {
  console.log(req.body);
  try {
    const { name, password, email } = req.body;
    const user = await userModel.find({ email });

    if (password?.length < 8 || password?.length > 16) {
      return res.status(400).send({
        success: false,
        message: "PAssword should be between 8 to 16 characters",
      });
    }

    const encryptedPassword = password
      ? await encryptPassword(password)
      : undefined;

    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: encryptedPassword || user.password,
      }
    );
    console.log(updatedUser, "updatedUSer");
    updatedUser.password = undefined;
    console.log(updatedUser);
    res.status(200).send({
      success: true,
      message: "Profile has been updated",
      updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating user",
      error,
    });
  }
};

const isSignedIn = exJwt({
  secret: process.env.JWT_ENCRYPTION,
  algorithms: ["HS256"],
});

module.exports = {
  registerController,
  loginController,
  updateController,
  isSignedIn,
};
