const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require("./api//routes/routes.js");

const app = express();

// body parser set up
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoDB set up
const db = "mongodb://expressuser:express123@ds111012.mlab.com:11012/express-demo";
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to Mongoose"))
    .catch(e => console.log(e));

// Routes set up
app.use('/api/tasks', routes);

// server port set up
const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));