// add middlewares here related to projects
// validate userId?
function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
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
  errorHandling,
};
