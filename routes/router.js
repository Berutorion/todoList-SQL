const router = require("express").Router()
const userRoueter = require("./users")
const todoRouter = require("./todos");
const authenticator = require("../middleware/auth").authenticator;

router.use("/todos" ,authenticator, todoRouter);
router.use("/users" , userRoueter);

module.exports = router
