const express = require("express");
const app = express();

const PORT = 80;

const blog = {
    id: 1,
    title: "Blog Title",
    description: "Blog description",
};

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" }).end(
        JSON.stringify(blog)
    );
});

// app.get();

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
