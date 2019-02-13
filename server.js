const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const socket = require("socket.io");
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
  app.use(express.static("client/public"));
}

// API routes 
const routes = require("./routes/user_api.js");
app.use(routes);

// Send every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tripperdb", { useNewUrlParser: true });


var server = app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

// Socket.io chat back-end logic
var onlineUsers = {};

var io = socket(server);

io.on("connection", (socket) => {
  console.log("User connected as: " + socket.id);

  io.to(socket.id).emit("id", socket.id);

  socket.on("create", (chatroom) => {
    socket.join(chatroom, () => {
      let rooms = Object.keys(socket.rooms);
      console.log(rooms);
    });

    console.log(socket.id + " has joined the " + chatroom + " chatroom.");
  });

  socket.on("SEND_MESSAGE", (data) => {
    console.log(data);

    io.sockets.to(data.roomId).emit("RECEIVE_MESSAGE", data.message);

    // io.sockets.emit("RECEIVE_MESSAGE", data);
  });

  socket.on("disconnect", () => {
    console.log("User, at" + socket.id + ", disconnected.");
    messages = [];
  });
});


