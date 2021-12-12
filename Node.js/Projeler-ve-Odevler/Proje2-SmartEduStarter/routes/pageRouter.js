const express = require("express");
const {
    getIndexPage,
    getAboutPage,
    getContactPage,
} = require("../controllers/pageController");
const router = express.Router();

router.route("/").get(getIndexPage);
router.route("/about").get(getAboutPage);
router.route("/contact").get(getContactPage);

module.exports = router;
