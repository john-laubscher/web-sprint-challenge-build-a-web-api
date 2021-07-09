const express = require("express");
const server = express();
const { logger } = require("./projects/projects-middleware");

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(express.json());
server.use(logger);

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send("Let's pass this sprint challenge!");
});

module.exports = server;
