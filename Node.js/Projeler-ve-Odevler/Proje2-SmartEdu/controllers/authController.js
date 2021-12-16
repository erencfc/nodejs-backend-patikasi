const bcrypt = require("bcrypt");
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createUser = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        req.flash("error", "You must fill in the blanks!");
        res.status(400).redirect("/register");
    } else {
        try {
            await User.create(req.body);
            req.flash("success", "Registered successfully.");
            res.status(201).redirect("/login");
        } catch (error) {
            if (error.code == 11000) {
                req.flash("error", "User already exists!");
                res.status(400).redirect("/register");
            } else {
                req.flash(
                    "error",
                    "Something happened! We couldn't create your account."
                );
                res.status(400).redirect("/register");
            }
        }
    }
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
        req.flash("error", "You must fill in the blanks!");
        res.status(400).redirect("/login");
    } else {
        try {
            User.findOne({ email: email }, (err, user) => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, same) => {
                        if (same) {
                            req.session.userID = user._id;
                            res.status(200).redirect("/users/dashboard");
                        } else {
                            req.flash(
                                "error",
                                "Password is incorrect! Please try again."
                            );
                            res.status(400).redirect("/login");
                        }
                    });
                } else {
                    req.flash(
                        "error",
                        'User not found! Click<a href="/register"> here </a>to create an account.'
                    );
                    res.status(400).redirect("/login");
                }
                if (err) console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID }).populate(
        "courses"
    );
    const categories = await Category.find();
    const courses = await Course.find({ user: req.session.userID });
    res.status(200).render("dashboard", {
        page_name: "dashboard",
        user: user,
        categories: categories,
        courses: courses,
    });
};
