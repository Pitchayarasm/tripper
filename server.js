const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
// const flash = require("connect-flash");
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


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
}

// API routes 
const user_routes = require("./routes/user_api.js");
app.use(user_routes);
const img_routes = require("./routes/profile_api.js");
app.use(img_routes);
const friends_routes = require("./routes/friend_api.js");
app.use(friends_routes);
const journal_routes = require("./routes/journal_entry_api");
app.use(journal_routes);

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
  socket.join(socket.id);
  io.to(socket.id).emit("id", socket.id);

  // Link userID to socket.id
  socket.on("logon", (userID) => {
    onlineUsers[userID] = socket.id;
    console.log(onlineUsers);
  });

  // Create private chatroom, when user selects friend to chat with
  socket.on("create", (chatroom, id) => {

    // Connect to selected socket
    if (id in onlineUsers) {
      
      io.sockets.connected[onlineUsers[id]].join(chatroom, () =>{
        console.log(id + " has joined the " + chatroom + " chatroom.");
      });
    }
  
    socket.join(chatroom);

    console.log(socket.id + " has joined the " + chatroom + " chatroom.");
  });

  socket.on("leave", (chatroom) => {
    socket.leave(chatroom, () => {
      io.to(socket.id).emit("leftRoom", "You have left the chatroom.");
    });
  });
  
  // Receive messages from client and return response to chatroom
  socket.on("SEND_MESSAGE", (data) => {
    io.in(data.roomId).emit("RECEIVE_MESSAGE", data);
    socket.to(data.roomId).emit("notification");
  });

  socket.on("typing", (data, room) => {
    socket.to(room).emit("isTyping", data);
  });

  socket.on("noTyping", (room) => {
    socket.to(room).emit("noTyping");
  });

  // disconnect user from the chatroom and clear message history
  socket.on("disconnect", () => {
    console.log("User, at" + socket.id + ", disconnected.");
  });
});


