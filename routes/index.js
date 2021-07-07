const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const { v4: uuidv4 } = require("uuid");

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get("/newMeeting",  ensureAuthenticated, (req, res) => {
    res.redirect(`/${uuidv4()}`);
  });
  // router.get("/:room", ensureAuthenticated, async (req, res) => {
  //   const roomData = await room.findOne({ roomId: req.params.room }).exec();
  //   res.render("room", {
  //     tabName: "S-Meet",
  //     layout: "layouts/videoLayout",
  //     roomId: req.params.room,
  //     //screen: req.query.screen,
  //     user: req.user,
  //   });
  // });
router.get("/:room", ensureAuthenticated, (req, res) => {
    res.render("room", { roomId: req.params.room });
});

 

module.exports = router;