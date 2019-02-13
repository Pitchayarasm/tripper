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

// Initial socket connection with client
io.on("connection", (socket) => {
  console.log("User connected.");
  io.to(socket.id).emit("id", socket.id);

  // Create private chatroom, when user selects friend to chat with
  socket.on("create", (chatroom) => {

      // Delivery the unique socket ID to the connected socket
      io.to(socket.id).emit("id", socket.id);
  
    socket.join(chatroom, (chatroom) => {
      io.to(socket.id).emit("id", socket.id);
      console.log(io.sockets.clients(chatroom).adapter.rooms);
    });

    console.log(socket.id + " has joined the " + chatroom + " chatroom.");
    socket.emit("success", "You are now chatting in the " + chatroom + " chatroom");

  });
  
  // Receive messages from client and return response to chatroom
  socket.on("SEND_MESSAGE", (data) => {
    console.log(data, socket.id, socket.rooms);

    io.in(data.roomId).emit("RECEIVE_MESSAGE", data);
    io.to(socket.id).emit("MY_MESSAGE", data);
  });

  // disconnect user from the chatroom and clear message history
  socket.on("disconnect", () => {
    console.log("User, at" + socket.id + ", disconnected.");
  });
});


