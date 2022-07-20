const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const logger = require("morgan")
const mongoose = require("mongoose");

const port = 3031;
const config = require('./config');

const notesRouter = require("./routes/notesAPI")

app.use(logger("dev"));

const dbUrl = config.dbUrl;


mongoose.connect(dbUrl, (err) => {
    if (err) console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/notes", notesRouter);

app.listen(port, function () {
    console.log("Running on " + port);
});

module.exports = app;