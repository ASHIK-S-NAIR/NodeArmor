const express = require("express");
const {
  createProject,
  getProjectById,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/project");
const { getUserById } = require("../controllers/user");
const router = express.Router();

// params
router.param("userId", getUserById);
router.param("projectId", getProjectById);

//createProject
// @type POST
// @route /api/v1/project/:userId
// @desc route to create project
// @access PRIVATE
router.post("/project", createProject);

//getProjects
// @type GET
// @route /api/v1/projects/:userId
// @desc route to get all projects based on userId
// @access PRIVATE
router.get("/projects/:userId", getProjects);

//getProject
// @type GET
// @route /api/v1/project/:projectId/:userId
// @desc route to get project based on projectId and userId
// @access PRIVATE
router.get("/project/:projectId/:userId", getProject);

//updateProject
// @type PUT
// @route /api/v1/project/:projectId/:userId
// @desc route to update project based on projectId and userId
// @access PRIVATE
router.put("/project/:projectId/:userId", updateProject);

//deleteProject
// @type DELETE
// @route /api/v1/project/:projectId/:userId
// @desc route to delete project based on projectId and userId
// @access PRIVATE
router.delete("/project/:projectId/:userId", deleteProject);

module.exports = router;
