const User = require("../models/user");
var jwt = require("jsonwebtoken");
var expressjwt = require("express-jwt");
var cookieParser = require("cookie-parser");
const { validationResult } = require("express-validator");

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existuser = await User.findOne({ email });
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array()[0].msg,
      });
    }

    if (existuser) {
      return res.json({ error: "Email is already registered" });
    }

    const user = new User(req.body);
    const signedUser = await user.save();
    res.status(200).json(signedUser);
  } catch (err) {
    return next(err);
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.json({ error: "Email is not registered" });
    }
    if (!user.authenticate(password)) {
      return res.json({ error: "email and password do not match" });
    }

    // generate a token with usere id and secret
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // persist token as t in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });

    // return response with user and token to frontend client
    const { _id, name, email ,role} = user;

    return res.json({ token, user: { _id, name, email ,role} });
  });
};
exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ msg: "signout success" });
};


// protected routes
exports.isSignedin = expressjwt({
  secret: process.env.SECRET,
  //sending user id to the req that's why we use userproperty like : _id
  userProperty: "auth",
});

// custom middleware

// To check user can modify his own details or not
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
// To check user is Admin or not
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.status(403).json({
      error: "you are not Admin",
    });
  }
  next();
};
