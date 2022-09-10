const router = require("express").Router();

const db = require("../models");
const User = db.User;
const Todo = db.Todo;
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/todos",
    failureRedirect: "/user/login",
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      console.log("User already exists");
      return res.render("register", { name, email, password, confirmPassword });
    }
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    await User.create({ name, email, password: hash });
    res.redirect("/users/login");
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  req.logout(false, (err) => {
    if (err) {
      console.log(err);
    }
    req.flash("success_msg", "登出成功");
    res.redirect("/users/login");
  });
});

module.exports = router;
