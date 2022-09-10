const router = require("express").Router();

const db = require("../models");
const User = db.User;
const Todo = db.Todo;

router.get("/", (req, res) => {
    const userId = req.user.id;
  return Todo.findAll({
    where:{userId},
    raw: true,
    nest: true,
  })
    .then((todos) => {
      res.render("index", { todos });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findByPk(id).then((todo) => {
    res.render("detail", { todo: todo.toJSON() }).catch((error) => {
      console.log(error);
    });
  });
});

module.exports = router;
