const router = require("express").Router();

const db = require("../models");
const Todo = db.Todo;

//新增資料
router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  try {
    await Todo.create({ name, UserId: userId });
    req.flash("success_msg", "新增成功");
    res.redirect("/todos");
  } catch (error) {
    console.log(error);
  }
});
//查詢全部
router.get("/", (req, res) => {
  const userId = req.user.id;
  return Todo.findAll({
    where: { userId },
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
//查詢一筆
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const todo = await Todo.findOne({ where: { id, userId } });
    res.render("detail", { todo: todo.toJSON() });
  } catch (error) {
    console.log(error);
  }
});

//修改資料

router.get("/:id/edit", async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const todo = await Todo.findOne({ where: { id, userId } });
    res.render("edit", { todo: todo.toJSON() });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const { name, isDone } = req.body;
  try {
    await Todo.update(
      { name, isDone: isDone === "on" ? 1 : 0 },
      { where: { id, userId } }
    );
    req.flash("success_msg", "修改成功");
    res.redirect("/todos");
  } catch (error) {
    console.log(error);
  }
});

//刪除資料
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    Todo.destroy({ where: { id, userId } });
    req.flash("success_msg", "刪除成功");
    res.redirect("/todos");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
