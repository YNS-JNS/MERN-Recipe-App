const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    savedRecipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RecipeModel"
        }
    ]
});

/**
 * Compares the entered password with the hashed password in the database
 * using bcrypt.
 * 
 * @param {string} enteredPassword - The password entered by the user.
 * @returns {Promise<boolean>} - A promise that resolves to true if the
 * entered password matches the hashed password, false otherwise.
*/
UserSchema.methods.matchPassword = async function (enteredPassword) {
    // Use bcrypt to compare the entered password with the hashed password.
    // The await keyword is used to wait for the promise returned by compare
    // to resolve. The resolved value indicates whether the passwords match.
    return await bcrypt.compare(enteredPassword, this.password);
}


/*
 * Middleware to run before saving a user to the database. 
 * It encrypts the user's password using bcrypt.
*/
UserSchema.pre("save", async function (next) {
    // If the password hasn't been modified, move on
    if(!this.isModified("password")) {
        next();
    }

    // Generate a salt for password encryption
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model("UserModel", UserSchema);