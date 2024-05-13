const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
    name: { 
        type: String, 
        required: true  // Ensures every category must have a name.
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'  // Creates a reference to the User model, useful for associating categories with specific users.
    }
},
{
  timestamps: true, // Automatically adds createdAt and updatedAt timestamps to each document.
});

module.exports = model("Category", categorySchema);
