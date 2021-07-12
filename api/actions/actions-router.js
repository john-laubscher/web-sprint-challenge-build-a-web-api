const express = require("express");
const router = express.Router();
const Action = require("../actions/actions-model");
const { validateActionId, validateAction } = require("./actions-middlware");

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res, next) => {
  Action.get(req.params.id)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

router.post("/", validateAction, (req, res, next) => {
  Action.insert(req.body)
    .then((createdAction) => {
      res.status(201).json(createdAction);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", validateAction, validateActionId, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch(next);
});

router.delete("/:id", validateActionId, (req, res, next) => {
  Action.remove(req.params.id)
    .then((result) => {
      console.log(result);
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
