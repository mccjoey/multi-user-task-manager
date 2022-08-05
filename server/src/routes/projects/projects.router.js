const express = require("express");
const isAuthenticated = require("../../middlewares/auth");
const { getAllProjects, createProject, deleteProject } = require("./projects.controller");

const projectsRouter = express.Router();

projectsRouter.get("/", isAuthenticated, getAllProjects);
projectsRouter.post("/create", isAuthenticated, createProject);
projectsRouter.post("/delete", isAuthenticated, deleteProject);
///projectsRouter.post("/update", isAuthenticated, getAllProjects);

module.exports = projectsRouter;
