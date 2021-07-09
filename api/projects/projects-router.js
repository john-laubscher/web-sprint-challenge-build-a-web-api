// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const { validateProjectId, validatePost, validateCompleted } = require("../projects/projects-middleware");
const Project = require("../projects/projects-model");

router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.get("/:id", validateProjectId, (req, res, next) => {
  Project.get(req.params.id)
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.post("/", validatePost, (req, res, next) => {
  Project.insert(req.body)
    .then((createdPost) => {
      res.status(201).json(createdPost);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", validateProjectId, validatePost, (req, res, next) => {
  Project.update(req.params.id, req.body)
    .then(() => {
      return Project.get(req.params.id);
    })
    .then((updatedProject) => {
      res.json(updatedProject);
    })
    .catch(next);
});

router.delete("/:id", validateProjectId, (req, res, next) => {
  Project.remove(req.params.id)
    .then((result) => {
      const deleteMessage = "Message successfully deleted";
      console.log(result);
      res.json(deleteMessage);
    })
    .catch(next);
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
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
