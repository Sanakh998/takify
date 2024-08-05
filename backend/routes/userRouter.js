const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/auth");
const {
  getUser,
  login,
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");


router.get("/", getUsers);
router.get("/user", checkAuth, getUser);
router.post("/login", login);
router.post("/register", registerUser);
router.put("/update", checkAuth, updateUser);
router.delete("/delete/:id", deleteUser);


module.exports = router;
