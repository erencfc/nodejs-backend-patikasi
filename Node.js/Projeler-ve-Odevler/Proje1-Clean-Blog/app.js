const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const {
    getAllPosts,
    getPost,
    editPost,
    createPost,
    deletePost,
} = require("./controllers/postController");
const {
    getAboutPage,
    getAddPage,
    get404Page,
    getEditPage,
} = require("./controllers/pageController");

mongoose
    .connect(
        "mongodb+srv://kleesd:arvSMaW6fCYz44sT@cluster0.bbx3r.mongodb.net/cleanBlogDB?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected."))
    .catch((err) => console.log(err));

app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"],
    })
);

// GET POST + CRUD
app.get("/", getAllPosts);
app.get("/posts/:id", getPost);
app.put("/posts/:id", editPost);
app.post("/posts", createPost);
app.delete("/posts/:id", deletePost);

// GET PAGES
app.get("/about", getAboutPage);
app.get("/add", getAddPage);
app.get("/posts/edit/:id", getEditPage);
app.get("*", get404Page);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
