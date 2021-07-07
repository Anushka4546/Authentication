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
io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId, userName) => {
      socket.join(roomId);
      socket.broadcast.to(roomId).emit('user-connected', userId);
      socket.on("message", (message) => {
        io.to(roomId).emit("createMessage", message, userName);
      });
      socket.on('disconnect', () => {
        socket.broadcast.to(roomId).emit('user-disconnected', userId)
      });
    });
  });

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server started on port ${PORT}`));