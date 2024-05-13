const { model, Schema } = require("mongoose");

const expenseSchema = new Schema({

  title: String,

  category: String,

  amount: Number,

  description: String,

  date: Date,

  receipt: String,
  
  avatar: {
    type: String,
    default: 'https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg'
  }
},
{
  timestamps: true,
});

module.exports = model("Expense", expenseSchema);