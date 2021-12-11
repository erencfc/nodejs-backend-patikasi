const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const Post = require("./models/Post");

mongoose.connect("mongodb://localhost/cleanblog-test-db");

app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
    const posts = await Post.find({});
    res.render("index", {
        posts,
    });
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

const PORT = 80;

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
