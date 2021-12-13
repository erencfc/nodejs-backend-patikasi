const express = require("express");
const {
    getIndexPage,
    getAboutPage,
    getContactPage,
    getRegisterPage,
    getLoginPage,
} = require("../controllers/pageController");
const router = express.Router();

router.route("/").get(getIndexPage);
router.route("/about").get(getAboutPage);
router.route("/contact").get(getContactPage);
router.route("/register").get(getRegisterPage);
router.route("/login").get(getLoginPage);

module.exports = router;
