var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError')
var bcrypt = require("bcrypt");

router.post('/register', (req, res, next) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  //server side validation...

  db.execute('SELECT * FROM users WHERE username=?', [username,])
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return db.execute('SELECT * FROM users WHERE email=?', [email]);
      } else {
        throw new UserError(
          'Registration failed: Username already exists.',
          '/register',
          200
        );
      }
    })
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return bcrypt.hash(password, 15);
      } else {
        throw new UserError(
          'Registration failed: Email already exists.',
          '/register',
          200
        );
      }
    })
    .then((hashedPassword) => {
      let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now());";
      return db.execute(baseSQL, [username, email, hashedPassword])
    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        successPrint("User was created");
        req.flash("success", "User account created.");
        res.redirect("/login");
      } else {
        throw new UserError(
          "Server error, user could not be created",
          "/register",
          500
        );
      }
    })
    .catch((err) => {
      errorPrint("User could not be made", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash("error", error.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
      } else {
        next(err);
      }
    })
});

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  //do server side validation

  let baseSQL = "SELECT id, username, password FROM users WHERE username=?;"
  let userid;
  db.execute(baseSQL, [username])
    .then(([results, fields]) => {
      if (results && results.length == 1) {
        let hashedPassword = results[0].password;
        userid = results[0].id;
        return bcrypt.compare(password, hashedPassword);
      } else {
        throw new UserError("invalid username and/or password.", "/login", 200);
      }
    })
    .then((passwordsMatched) => {
      if (passwordsMatched) {
        successPrint(`User ${username} is logged in.`);
        req.session.username = username;
        req.session.userid = userid;
        res.locals.logged = true;
        req.flash("success", "You have been successfully logged in.");
        res.redirect("/");
      } else {
        throw new UserError("Invalid username and/or password.", "/login", 200);
      }
    })
    .catch((err) => {
      errorPrint("user login failed");
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash("error", err.getMessage());
        res.status(err.getStatus());
        res.redirect("/login");
      } else {
        next(err);
      }
    })
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if(err) {
      errorPrint("Session could not be destroyed.");
      next(err);
    }else {
      successPrint("Session was destroyed.");
      res.clearCookie("csid");
      res.json({status: "OK", message: "User was logged out."});
    }
  })
});

module.exports = router;