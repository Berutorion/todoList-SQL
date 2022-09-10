const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  //設定本地登入策略
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });
          //email 還沒被註冊
          if (!user) {
            return done(null, false, {
              message: "That email is not registered.",
            });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          //輸入密碼錯誤
          if (!isMatch)
            return done(null, false, {
              message: "The email or password is not correct ",
            });
          //email存在、密碼正確
          return done(null, user);
        } catch (err) {
          console.log(err);
          done(err, false);
        }
      }
    )
  );

  //設定序列化
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  //設定反序列化
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => {
        done(null, user.toJSON());
      })
      .catch((err) => done(err, null));
  });
};
