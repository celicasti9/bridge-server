const { model, Schema } = require("mongoose");

const expenseSchema = new Schema({

  title: String,

  category: String,

  amount: Number,

  description: String,

  date: Date,

  receipt: String
},
{
  timestamps: true,
});

module.exports = model("Expense", expenseSchema);