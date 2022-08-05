const express = require("express");
const userRouter = require("./user/user.router");
const projectsRouter = require("./projects/projects.router");

const api = express.Router();

api.use("/user", userRouter);
api.use("/projects", projectsRouter);

module.exports = api;
