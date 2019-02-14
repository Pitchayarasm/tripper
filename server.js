const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const PORT = process.env.PORT || 3001;
const app = express();
const logger = require("morgan")

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(
  session({
    secret: "secret", 
    resave: false,
    saveUninitialized: true,
    cookie: {secure: "auto"}
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));

// Connect flash
app.use(flash());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// API routes 
const user_routes = require("./routes/user_api.js");
app.use(user_routes);
const img_routes = require("./routes/profilePic_api.js");
app.use(img_routes);
const friends_routes = require("./routes/friend_api.js");
app.use(friends_routes);
const journal_routes = require("./routes/journal_entry_api");
app.use(journal_routes);

// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tripperdb", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
