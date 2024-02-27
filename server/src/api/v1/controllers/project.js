const Project = require("../models/project");

// getProjectById- Middleware
exports.getProjectById = async (req, res, next, id) => {
  try {
    const project = await Project.findById({ _id: id });
    req.project = project;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Project by this id not found in the DB",
    });
  }
};

exports.createProject = async (req, res) => {
  const { projectName, user } = req.body;
  try {
    const project = await Project.create({
      projectName,
      user,
    });
    await project.save();
    return res.json(project);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to create a user in DB",
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.profile._id }).populate(
      "user"
    );
    return res.json(projects);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get projects from DB",
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    return res.json(req.project);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get project from DB",
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    await Project.findByIdAndUpdate(
      { _id: req.project._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    return res.status(200).json({
      status: "ok",
      message: "project has been successfully updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "Internal Server error",
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.deleteOne({ _id: req.project._id });
    return res.status(200).json({
      status: "ok",
      message: "Project has been successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "Internal Server error",
    });
  }
};
