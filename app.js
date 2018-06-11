const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const httpErrors = require("http-errors");
const logger = require("morgan");
const path = require("path");

const secrets = require("./utilities/secret-loader");

const indexRouter = require("./routes/index");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors({
    origin: secrets.approvedOrigins.split(",")
}));
app.use(logger(secrets.logLevel));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// Forward 404 to error handler
app.use((req, res, next) => {
    next(httpErrors(404));
})

// Error handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something broke");
})

module.exports = app;
