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