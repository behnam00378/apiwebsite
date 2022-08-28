const { Router } = require("express");
const { authenticated } = require("../middlewares/auth");
const userController = require("../controller/userController");

const router = new Router();

//@desc Login Handle
// @route    POST /users/login
router.post("/login", userController.handleLogin);

// @desc  handle forget password page
// @route    Post /dashboard/forget-password
router.post("/forget-password", userController.handleForgetPassword);

// @desc handle reset password page
// @route    post /dashboard/reset-password/:id
router.post("/reset-password/:token", userController.handleResetPassword);

// @desc Register Handle
// @route    Get /dashboard/register
router.post("/register", userController.creatUser);

module.exports = router;
