// add middlewares here related to projects
// validate userId?
function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

async function validateProjectId(req, res, next) {
  try {
    const project = await project.get(req.params.id);
    if (!project) {
      next({ status: 404, message: "project not found" });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    res.status(404).json({
      message: "no such project",
    });
  }
}

const errorHandling = (err, req, res, next) => {
  // eslint-disable-line
  const status = err.status || 500;
  res.status(
    status.json({
      message: err.message,
    })
  );
};

module.exports = {
  logger,
  validateProjectId,
  errorHandling,
};
