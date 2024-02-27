const express = require("express");
const router = express.Router();
const { getUser, getUserById } = require("../controllers/user");


// params
router.param("userId", getUserById);

// getUser
// @type GET
// @route /api/v1/user/:userId
// @desc route to get user By userID
// @access PRIVATE
router.get("/user/:userId", getUser);

module.exports = router;