const { Router } = require("express");
const { authenticated } = require("../middlewares/auth");
const adminController = require("../controller/adminController");
const router = new Router();

// @desc Delete-post page
// @route Get /dashboard/delete-post/:id
router.delete("/delete-post/:id", authenticated, adminController.deletePost);

// @desc Handle post-creation
// @route POST /dashboard/add-post
router.post("/add-post", authenticated, adminController.createPost);

// @desc dashboard hanlde edite-post page
// @route Get /dashboard/edite-post/:id
router.put("/edite-post/:id", authenticated, adminController.editePost);

// @desc Handle image-upload
// @route POST /dashboard/image-upload
router.post("/image-upload", authenticated, adminController.uploadImage);

module.exports = router;
