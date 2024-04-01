const jwt = require('jsonwebtoken');

/**
 * Verifies the given JWT token using the secret key provided in the environment variables.
 *
 * @param {string} token - The JWT token to be verified.
 * @return {Object|boolean} - The decoded payload of the JWT token if the verification is successful,
 *                            or false if the verification fails.
 */
export const verifyToken = (token) => {
    // Verify the JWT token using the secret key. If verification fails, return false,
    // otherwise return the decoded payload of the token.

    return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        // If verification fails, return false.
        if (err) {
            return false;
        }
        // Otherwise, return the decoded payload of the token.
        return decoded;
    });
};
