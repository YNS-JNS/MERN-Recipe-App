const mongoose = require("mongoose");

const RecipeSchema = new mongoose({
    name: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            type: String,
            required: true
        }
    ],
    instructions:
    {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    }

});

module.exports = mongoose.model("RecipeModel", RecipeSchema);