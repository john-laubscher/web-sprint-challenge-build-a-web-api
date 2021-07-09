// Write your "projects" router here!
const express = require("express");
const router = express.Router();

const Project = require("../projects/projects-model");

router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "something tragic inside posts router happned",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
