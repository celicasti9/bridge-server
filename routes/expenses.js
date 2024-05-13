var express = require('express');
var router = express.Router();

const Expense = require("../models/Expense");

/* GET expenses listing. */
router.get('/', function(req, res, next) {
    Expense.find()
  // Removed populate unless necessary
  .then((foundExpenses) => { // Corrected variable name
    console.log("Found expenses ===>", foundExpenses);
    res.json(foundExpenses)
  })
    .catch((err) => {
        console.log("Error fetching expenses ===>", err) // Corrected log message
        res.json(err);
    });
});

router.get('/details/:expenseId', (req, res, next) => {
    Expense.findById(req.params.expenseId) // Corrected case sensitivity
    // Removed populate unless necessary
    .then((foundExpense) => { // Corrected variable name
      console.log("Found Expense ===>", foundExpense);
      res.json(foundExpense)
    })
    .catch((err) => {
        console.log("Error finding expense ===>", err); // Added missing error handling
        res.json(err);
    });
});

router.post('/', (req, res, next) => {
    const {category, amount, date, receipt} = req.body;

    Expense.create(req.body)
        .then((createdExpense) => {
            console.log("Created Expense ===>", createdExpense);
        res.json(createdExpense);
    })
        .catch((err) => {
            console.log("Error creating expense ===>", err);
            res.json(err);
        });
});

router.put('/update/:expenseId', (req, res, next) => {
    Expense.findByIdAndUpdate(
        req.params.expenseId,
        req.body, 
        { new: true }
    )
    .then((updatedExpense) => {
        console.log("Updated Expense ===>", updatedExpense);
        res.json(updatedExpense); 
    })
    .catch((err) => {
        console.log("Error updating expense ===>", err);
        res.json(err);
    });
});

router.get('/delete/:expenseId', (req, res, next) => {
    Expense.findByIdAndDelete(req.params.expenseId)
      .then((deletedExpense) => {
        console.log("Deleted expense ===>", deletedExpense);
        res.json(deletedExpense);
      })
      .catch((err) => {
        console.log("Error deleting expense ===>", err);
        res.json(err);
    });
});


router.delete('/:expenseId', (req, res) => {
  console.log("This is the expenseID", req.params.expenseId)
    Expense.findByIdAndDelete(req.params.expenseId)
      .then(deletedExpense => {
        if (!deletedExpense) {
          return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense successfully deleted" });
      })
      .catch(err => {
        console.error("Error deleting expense:", err);
        res.status(500).json({ error: "Error deleting expense", message: err.message });
      });
  });

  
  

module.exports = router;
