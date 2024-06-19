const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET
router.get("/", userController.getDash);

// GET /users/list
router.get("/list", userController.getUserList);

// GET /users/add
router.get("/add", userController.renderAddUserForm);

// POST /users/add
router.post("/add", userController.addUser);

// GET /users/edit/:id
router.get("/edit/:id", userController.renderEditUserForm);

// POST /users/edit/:id
router.post("/edit/:id", userController.updateUser);

// GET /users/delete/:id
router.get("/delete/:id", userController.deleteUser);

//GET users/search

router.get("/search", userController.searchUser);

module.exports = router;
