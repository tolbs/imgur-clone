var db = require('../config/database');
var express = require('express');
var router = express.Router();
var userIsLoggedIn = require("../middleware/routeprotectors").userIsLoggedIn;
var getRecentPosts = require("../middleware/postsmiddleware").getRecentPosts;

router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', {title: "Meme Machine"});
});

router.get('/login', (req, res, next) => {
  res.render('login', {title: "Login"})
})

router.get('/register', (req, res, next) => {
  res.render('register', {title: "Create Account"})
})

router.use('/postimage', userIsLoggedIn);
router.get('/postimage', (req, res, next) => {
  res.render('postimage', {title: "Post Image"})
})

router.use('/post/:id(\\d+)', (req, res, next) => {
  let baseSQL = "SELECT u.username, p.description, p.photopath, p.created \
  FROM users u \
  JOIN posts p \
  ON u.id=fk_userid \
  WHERE p.id=?;";

  let postId = req.params.id;
  db.execute(baseSQL, [postId])
  .then(([results, field]) => {
    if(results && results.length) {
      let post = results[0];
      res.render('imagepost', {currentPost: post});
    } else {
      req.flash('error', "This is not the post you are looking for.");
      res.redirect("/");
    }
  })
  // res.send({params:req.params.id});
});

module.exports = router;