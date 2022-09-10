const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const router = require("./routes/router");
const session = require("express-session");
const flash = require("connect-flash");
const usePassport = require("./config/passport");
require("dotenv").config();

const port = 3000;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

usePassport(app);

app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

app.use(router);

app.get("/", (req, res) => {
  res.redirect("/todos");
});

app.listen(port, (req, res) => {
  console.log(`Express server is working on http://localhost:${port}`);
});
