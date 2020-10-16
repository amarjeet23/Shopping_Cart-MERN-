const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cat) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found",
      });
    }
    req.category = cat;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      res.status(400).json({
        error: "not able to create category",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, items) => {
    if (err) {
      return res.status(400).json({
        error: "not categories found",
      });
    }
    res.json(items);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "failed to update category",
      });
    }
    res.json({ updatedCategory });
  });
};
exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, removedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "failed to remove category",
      });
    }
    res.json({ message: "category deleted successfully" });
  });
};