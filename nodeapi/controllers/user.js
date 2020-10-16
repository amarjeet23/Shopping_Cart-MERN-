const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user not found",
      });
    }
    // Adds user to req with user info.
    req.profile = user;
    next();
  });
};

exports.hasAuthorization = (req, res, id, next) => {
  const authorised =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorised) {
    return res.status(403).json({
      error: "user is not allowed to perform this action",
    });
  }

  next();
};

exports.allUsers = (req, res) => {
  User.find((err, user) => {
    if (err) {
      return res.json({ err: err });
    }
    res.json({ user });

    // for getting specefic field
  }).select("name email updated created");
};

// only made to make some info privacy like password which can't be sent to frontend
exports.getUser = (req, res) => {
  (req.profile.encry_password = undefined), (req.profile.salt = undefined);
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "you are not authorised to perform this",
        });
      }
      (user.encry_password = undefined), (user.salt = undefined);
      res.json(user);
    }
  );
};
exports.deleteUser = (req, res) => {
  let user = req.profile;

  user.remove((err, user) => {
    if (err) {
      res.status(400).json({ error: err });
    }
    user.encry_password = undefined;
    user.salt = undefined;
    res.json({ msg: "user deleted successfully" });
  });
};
exports.userPurchaselist = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order in the account",
        });
      }
      return res.json(order);
    });
};
