const asyncHandler = require('express-async-handler');
const UserModel = require('../models/User.model');
const generateToken = require('../utils/generateToken');

/**
 * Authenticates a user by checking if the provided email and password
 * match those in the database. If successful, generates a token and sends
 * a response with the user data and token.
 * 
 * @route   POST /api/v1/users/sign-in
 * @access  Public
*/
exports.signIn = asyncHandler(async (req, res) => {

    if (!req.body.email || !req.body.password) {
        res.status(400);
        throw new Error('Please add email and password');
    }

    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find the user in the database by email
    const user = await UserModel.findOne({ email });

    // If user exists and password matches, generate a token and send response
    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);

        res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            userId: user._id,
            name: user.name,
            email: user.email,
            token
            // Nb: avoid sending sensitive user information like passwords in the response. Only send non-sensitive information.
        })
    } else {
        // If user or password is invalid, send an error response
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

/**
 * Creates a new user by checking if the provided email and password
 * are valid. If successful, generates a token and sends
 * a response with the new user data and token.
 * 
 * @route   POST /api/v1/users/sign-up
 * @access  Public
*/
exports.signUp = asyncHandler(async (req, res) => {

    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400);
        throw new Error('Please add name, email and password');
    }

    // Extract the name, email and password from the request body
    const { name, email, password } = req.body;

    // Check if a user with the same email already exists in the database
    const userExists = await UserModel.findOne({ email });

    // If a user with the given email already exists, return an error
    if (userExists) {
        res.status(400); // Bad Request
        throw new Error('User already exists');
    }

    // Create a new user in the database with the provided name, email and password
    const user = await UserModel.create({
        name,
        email,
        password
    });

    // If the user was created successfully
    if (user) {
        // Generate a token for the user
        const token = generateToken(user._id);

        // Send a success response with the user data and the generated token
        res.status(201).json({ // Status Code: 201 - Created
            status: "success",
            message: "User Registered Successfully",
            userId: user._id,
            name: user.name,
            email: user.email,
            token
            // Nb: avoid sending sensitive user information like passwords in the response. Only send non-sensitive information.
        });
    } else {
        res.status(400); // Bad Request
        throw new Error('Invalid user data');
    }
});