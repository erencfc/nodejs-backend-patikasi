const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");

const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const app = express();

const mongoUrl =
    "mongodb+srv://dbUser:q3o3FS97QAkfUREH@cluster0.mnuzf.mongodb.net/smartEduDB?retryWrites=true&w=majority";

mongoose
    .connect(mongoUrl)
    .then(() => console.log("DB Connected!"))
    .catch((err) => console.log(err));

app.set("view engine", "ejs");

// GLOBAL VARIABLE
global.userIN = null;

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "my_keyboard_cat",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: mongoUrl,
        }),
    })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"],
    })
);

// ROUTE
app.use("*", (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
