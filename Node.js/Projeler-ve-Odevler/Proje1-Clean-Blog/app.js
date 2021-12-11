const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejs = require("ejs");
const app = express();
const Post = require("./models/Post");

mongoose.connect("mongodb://localhost/cleanblog-test-db");

app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
    const posts = await Post.find({}).sort("-dateCreated");
    res.render("index", {
        posts,
    });
});

app.get("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render("post", {
        post,
    });
});

app.get("/posts/edit/:id", async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    res.render("edit", { post });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/post", (req, res) => {
    res.render("post");
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.get("*", (req, res) => {
    res.writeHead(404, "text/html").end("<h1>404 NOT FOUND</h1>");
});

app.post("/posts", async (req, res) => {
    await Post.create(req.body);
    res.redirect("/");
});

app.put("/posts/:id", async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    post.title = req.body.title;
    post.detail = req.body.detail;
    post.save();
    res.redirect(`/posts/${post._id}`);
});

const PORT = 80;

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
