const express = require("express");
const { body } = require("express-validator");

const {
    createUser,
    loginUser,
    logoutUser,
    getDashboardPage,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.route("/signup").post(
    [
        body("name").not().isEmpty().withMessage("Please enter your name."),
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email.")
            .custom((userEmail) => {
                return User.findOne({ email: userEmail }).then((user) => {
                    if (user) {
                        return Promise.reject("The user already exists!");
                    }
                });
            }),
        body("password")
            .not()
            .isEmpty()
            .withMessage("Please enter your password."),
    ],
    createUser
);
router
    .route("/login")
    .post(
        [
            body("email").isEmail().withMessage("Please enter your email."),
            body("password")
                .not()
                .isEmpty()
                .withMessage("Please enter your password."),
        ],
        loginUser
    );
router.route("/logout").get(logoutUser);
router.route("/dashboard").get(authMiddleware, getDashboardPage);

module.exports = router;
