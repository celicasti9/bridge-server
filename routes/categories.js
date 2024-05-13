var express = require('express');
var router = express.Router();

const Category = require("../models/Category");

/* GET categories listing. */
router.get('/', function(req, res) {
  Category.find()
    .then(foundCategories => {
      res.json(foundCategories);
    })
    .catch(err => {
      console.error("Error fetching categories:", err);
      res.status(500).json({ message: "Error fetching categories", error: err });
    });
});

router.get('/details/:categoryId', (req, res) => {
  Category.findById(req.params.categoryId)
    .then(category => {
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    })
    .catch(err => {
      console.error("Error finding category:", err);
      res.status(500).json({ message: "Error finding category", error: err });
    });
});

router.post('/', (req, res) => {
  console.log(req.body); // Add this line
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  Category.create({ name })
    .then(createdCategory => {
      res.status(201).json(createdCategory);
    })
    .catch(err => {
      console.error("Error creating category:", err);
      res.status(500).json({ message: "Error creating category", error: err });
    });
});


router.put('/update/:categoryId', (req, res) => {
  Category.findByIdAndUpdate(
    req.params.categoryId,
    req.body,
    { new: true }
  )
  .then(updatedCategory => {
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  })
  .catch(err => {
    console.error("Error updating category:", err);
    res.status(500).json({ message: "Error updating category", error: err });
  });
});

router.delete('/delete/:categoryId', (req, res) => {
  Category.findByIdAndDelete(req.params.categoryId)
    .then(deletedCategory => {
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({ message: "Category deleted successfully" });
    })
    .catch(err => {
      console.error("Error deleting category:", err);
      res.status(500).json({ message: "Error deleting category", error: err });
    });
});

module.exports = router;
