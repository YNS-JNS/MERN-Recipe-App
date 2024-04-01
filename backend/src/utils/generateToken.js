const jwt = require("jsonwebtoken");

/**
 * Generates a JSON Web Token (JWT) with the provided payload.
 *
 * @param {Object|string} payload - The data to be encoded in the token.
 * @return {string} The generated JSON Web Token.
 */
const generateToken = (payload) => {
    // Sign the payload using the JWT_SECRET_KEY environment variable,
    // specifying the expiration time using the JWT_EXPIRES_IN environment variable.
    return jwt.sign(
        { sub: payload }, // The data to be encoded in the token.
        process.env.JWT_SECRET_KEY, // The secret key used to sign the token.
        { expiresIn: process.env.JWT_EXPIRES_IN } // The token expiration time.
    );
};

module.exports = generateToken;