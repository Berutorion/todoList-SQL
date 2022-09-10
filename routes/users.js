const router = require("express").Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  res.send("Login");
});

router.get("/regiseter", (req, res) => {
  res.render("regiseter");
});

router.post("/regiseter", (req, res) => {
  res.send("regiseter");
});

router.get("/logout", (req, res) => {
  res.send("Logout");
});

module.exports = router;
