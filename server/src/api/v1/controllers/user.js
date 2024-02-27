const User = require("../models/user");

// getUserById- Middleware
exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById({ _id: id });
    req.profile = user;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "User by this id not found in the DB",
    });
  }
};

// getUser
exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};
