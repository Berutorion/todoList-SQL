const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");
const router = require("./routes/router")
const port = 3000;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "/views");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(router);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, (req, res) => {
  console.log(`Express server is working on http://localhost:${port}`);
});
