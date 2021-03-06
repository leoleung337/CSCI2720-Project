const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//connecting to Mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
//connection failure
connection.on("error", console.error.bind(console, "Connection error"));
//Connect Successfully
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//import routes
const login = require("./routes/loginRoutes");
const register = require("./routes/registerRoutes");
const admin = require("./routes/adminRoutes");
const search = require("./routes/searchRoutes");
const location = require("./routes/locationRoutes");
const weather = require("./routes/weatherRoutes");
app.use(login);
app.use(register);
app.use(admin);
app.use(search);
app.use(location);
app.use(weather);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
