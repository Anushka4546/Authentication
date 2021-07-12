const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
const server = require("http").Server(app);
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
const User = require("./User.js");
const { v4: uuidv4 } = require("uuid");

app.use('/peerjs', peerServer);

//passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static("public"));

//Bodyparser
app.use(express.urlencoded({ extended: false}));

// Express Session 
app.use(session({
    secret: 'keyboard',
    resave: true,
    saveUninitialized: true,
}));

// Passport midleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

//join room
app.post("/join-room", (req, res) => {
    res.redirect(`/${req.body.room_id}`);
});

// video chat
let user_list = {};

const sendToAllRoom = (room, emit, message) => {
  for (let i in user_list) {
      if (user_list[i].room == room) {
          user_list[i].socket.emit(emit, message);
      }
  }
}

const sendToAllRooms = (room, emit, message, userName) => {
    for (let i in user_list) {
        if (user_list[i].room == room) {
            user_list[i].socket.emit(emit, message, userName);
        }
    }
  }

io.on('connection', socket => {
  //DEBUG: JOIN-ROOM NOT BEING SENT
  //FIXED: JOIN-ROOM SENT CREATED HELPER FUNCTION ABOVE CALLED SENDTOALLROOM
  socket.on('join-room', (roomId, userId, userName) => {
      socket.id = userId;
      socket.room = roomId;
      socket.join(roomId)

      sendToAllRoom(roomId, 'user-connected', userId);
      console.log(`joined ${roomId}`);

      user_list[socket.id] = new User({ name: `User_${user_list.length}`, socket: socket });

    // messages
    socket.on('message', (message) => {
        console.log(message, user_list[socket.id].room);
        //send message to the same room
        sendToAllRooms(user_list[socket.id].room, "createMessage", message, userName);
    });
    // socket.on("message", (message) => {
    //     io.to(roomId).emit("createMessage", message, userName);
    //   });

    socket.on('disconnect', () => {
        sendToAllRoom(user_list[socket.id].room, "user-disconnected", socket.id);
        delete user_list[socket.id];
    })
})
})


const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server started on port ${PORT}`));