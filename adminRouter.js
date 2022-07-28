const express = require("express");
const adminRoutes = express.Router();

const logs = (req, res, next) => {
  console.log("hello hi ba");
  next();
};

adminRoutes.all("*", logs);

adminRoutes.get("/", (req, res) => {
  res.redirect("/admin/home");
  res.end();
});

adminRoutes.get("/home", (req, res) => {
  res.send("tui ekta gappa kaisossssss fsfas");
});

module.exports = adminRoutes;
