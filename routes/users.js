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
  let errors = [];
  try {
    //確認信箱是否重複
    if (await User.findOne({ where: { email } }))
      errors.push({ message: "這個信箱已經註冊!!" });
    //確認欄位是否為空值
    if (!name || !email || !password || !confirmPassword)
      errors.push({ message: "所有欄位為必填!!" });
    //確認兩次輸入的密碼是否為相同
    if (confirmPassword != password)
      errors.push({ message: "密碼與確認密碼不相符!!" });
    if (errors.length) {
      req.flash("warning_msg", errors[0].message);
      return res.render("register", {
        name,
        email,
        password,
        confirmPassword,
        warning_msg: req.flash("warning_msg"),
      });
    }

    //將註冊資料寫入資料庫
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    await User.create({ name, email, password: hash });
    req.flash("success_msg", "註冊成功，請重新登入");
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
