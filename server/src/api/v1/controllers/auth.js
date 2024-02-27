const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");

exports.signup = async (req, res) => {
  const { firstName, secondName, email, password } = req.body;
  try {
    const user = await User.create({
      firstName,
      secondName,
      email,
      password,
    });
    await user.save();
    user.encry_password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    return res.json(user);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to create a user in DB",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    if (await user.authenticate(password)) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);

      const { _id, name, email, role } = user;

      return res.json({ token, user: { _id, name, email, role } });
    }

    return res.status(400).json({
      error: "Invalid email or password",
    });
  } catch (error) {
    return res.status(400).json({
      error: "Invalid email or password",
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logged out successfully",
  });
};

// isSignedIN
exports.isSignedIn = expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    userProperty: "user",
  });
  
  // isAuthenticated
  exports.isAuthenticated = (req, res, next) => {
    const checker = req.profile && req.user && req.profile._id == req.user._id;
    if (!checker) {
      return res.status(403).json({
        message: "Authentication failed",
      });
    }
    next();
  };
