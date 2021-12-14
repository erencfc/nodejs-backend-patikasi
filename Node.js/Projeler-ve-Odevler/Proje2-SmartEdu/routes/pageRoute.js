const express = require("express");
const {
    getIndexPage,
    getAboutPage,
    getContactPage,
    getRegisterPage,
    getLoginPage,
} = require("../controllers/pageController");
const redirectMiddleware = require("../middlewares/redirectMiddleware");

const router = express.Router();

router.route("/").get(getIndexPage);
router.route("/about").get(getAboutPage);
router.route("/contact").get(getContactPage);
router.route("/register").get(redirectMiddleware, getRegisterPage);
router.route("/login").get(redirectMiddleware, getLoginPage);

module.exports = router;
