const Post = require("../models/Post");

exports.getAboutPage = (req, res) => {
    res.render("about");
};

exports.getAddPage = (req, res) => {
    res.render("add");
};

exports.getEditPage = async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    res.render("edit", { post });
};

exports.get404Page = (req, res) => {
    res.writeHead(404, "text/html").end("<h1>404 NOT FOUND</h1>");
};
