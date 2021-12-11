const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/post", (req, res) => {
    res.render("post");
});

app.get("/add_post", (req, res) => {
    res.render("add_post");
});

app.get("*", (req, res) => {
    res.writeHead(404, "text/html").end("<h1>404 NOT FOUND</h1>");
});

const PORT = 80;

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
