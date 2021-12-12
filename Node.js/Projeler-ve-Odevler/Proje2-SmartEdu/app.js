const express = require("express");
const app = express();
const pageRoute = require("./routes/pageRouter");

app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public"));

// ROUTE
app.use("/", pageRoute);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
