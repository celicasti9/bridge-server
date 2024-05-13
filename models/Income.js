const { model, Schema } = require("mongoose");

const incomeSchema = new Schema({
    source: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    }
},
{
  timestamps: true,  // This creates createdAt and updatedAt timestamps automatically
});

module.exports = model("Income", incomeSchema);
