const express = require("express");
const {
    getIndexPage,
    getAboutPage,
    getContactPage,
    getRegisterPage,
} = require("../controllers/pageController");
const router = express.Router();

router.route("/").get(getIndexPage);
router.route("/about").get(getAboutPage);
router.route("/contact").get(getContactPage);
router.route("/register").get(getRegisterPage);

module.exports = router;
