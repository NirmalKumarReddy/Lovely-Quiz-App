// Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 7000;
const path = require("path");

app.use(bodyParser.json());
// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Connect to DB
mongoose.connect("mongodb://localhost:27017/lovelyQuizApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

app.post("/", (req, res) => {
  var email = req.body.email;

  var password = req.body.password;
  var confirm_password = req.body.password;

  var data = {
    email: email,
    password: password,
    confirm_password: password,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  return res.redirect("/");
});

// Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.set({ "Allow-access-Allow-Origin": "*" });
  res.render("index", { text: "This is EJS" });
});

app.get("/about", (req, res) => {
  res.render("about", { text: "About Page" });
});
app.get("/signup", (req, res) => {
  res.render("signup", { text: "signup Page" });
});
app.get("/test", (req, res) => {
  res.render("test");
});
app.get("/img", (req, res) => {
  res.render("img");
});
//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));
