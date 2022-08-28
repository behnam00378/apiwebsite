const { Router } = require("express");
const blogController = require("../controller/blogController");
const router = new Router();

// @desc shop Index page
// @route Get /

router.get("/", blogController.getIndex);

// @desc shop Index page
// @route Get /post/:id

router.get("/post/:id", blogController.getSinglePost);


//  @desc   Weblog Numric Captcha
//  @route  GET /captcha.png
router.get("/captcha.png", blogController.getCaptcha);

//  @desc   Handle Contact Page
//  @route  POST /contact
router.post("/contact", blogController.handleContactPage);


module.exports = router;
