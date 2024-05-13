var express = require('express');
var router = express.Router();

const Income = require("../models/Income");

/* GET income listing. */
router.get('/', function(req, res, next) {
    Income.find()
    // Assuming .populate() is not needed unless correctly referencing another model
    .then((foundIncomes) => {
        console.log("Found incomes ===>", foundIncomes);
        res.json(foundIncomes);
    })
    .catch((err) => {
        console.log("Error fetching incomes ===>", err);
        res.json(err);
    });
});

router.get('/details/:incomeId', (req, res, next) => {
    Income.findById(req.params.incomeId)
    // Assuming .populate() is not needed unless correctly referencing another model
    .then((foundIncome) => {
        console.log("Found Income ===>", foundIncome);
        res.json(foundIncome);
    })
    .catch((err) => {
        console.log("Error finding income ===>", err);
        res.json(err);
    });
});

router.post('/', (req, res, next) => {
    const {source, amount, description, date} = req.body;

    Income.create(req.body)
        .then((createdIncome) => {
            console.log("Created Income ===>", createdIncome);
            res.json(createdIncome);
        })
        .catch((err) => {
            console.log("Error creating income ===>", err);
            res.json(err);
        });
});

router.post('/update/:incomeId', (req, res, next) => {
    Income.findByIdAndUpdate(
        req.params.incomeId,
        req.body, 
        { new: true }
    )
    .then((updatedIncome) => {
        console.log("Updated Income ===>", updatedIncome);
        res.json(updatedIncome);
    })
    .catch((err) => {
        console.log("Error updating income ===>", err);
        res.json(err);
    });
});

router.get('/delete/:incomeId', (req, res, next) => {
    Income.findByIdAndDelete(req.params.incomeId)
        .then((deletedIncome) => {
            console.log("Deleted Income ===>", deletedIncome);
            res.json(deletedIncome);
        })
        .catch((err) => {
            console.log("Error deleting income ===>", err);
            res.json(err);
        });
});

module.exports = router;
