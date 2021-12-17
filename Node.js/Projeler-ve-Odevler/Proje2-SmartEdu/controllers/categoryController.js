const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        req.flash("success", `${category.name} created successfully!`);
        res.status(201).redirect("/users/dashboard");
    } catch (error) {
        req.flash("error", `Something went wrong!`);
        res.status(400).redirect("/users/dashboard");
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        req.flash("error", `${category.name} deleted successfully!`);
        res.status(200).redirect("/users/dashboard");
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};
