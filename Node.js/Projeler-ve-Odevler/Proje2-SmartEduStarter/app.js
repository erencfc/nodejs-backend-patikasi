const express = require("express");
const app = express();

app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.status("200").send("INDEX SAYFASI");
});

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
