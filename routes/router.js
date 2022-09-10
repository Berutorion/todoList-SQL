const router = require("express").Router()
const userRoueter = require("./users")


router.use("/users" , userRoueter);

module.exports = router
