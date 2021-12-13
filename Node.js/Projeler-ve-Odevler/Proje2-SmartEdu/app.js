const express = require("express");
const mongoose = require("mongoose");

const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const app = express();

mongoose
    .connect("mongodb://localhost/smartEduDB")
    .then(() => console.log("DB Connected!"))
    .catch((err) => console.log(err));

app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTE
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
