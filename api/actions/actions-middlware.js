// add middlewares here related to actions

const Action = require("../actions/actions-model");

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (!action) {
      next({ status: 404, message: "action not found" });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    res.status(404).json({
      message: "no such action",
    });
  }
}

function validateAction(req, res, next) {
  if (!req.body.notes || !req.body.description || !req.body.project_id) {
    next({
      status: 400,
      message: "missing required notes, description, or project ID field",
    });
  } else {
    next();
  }
}

module.exports = {
  validateActionId,
  validateAction,
};
