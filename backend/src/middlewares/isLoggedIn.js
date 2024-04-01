const { getTokenFromHeader } = require('../utils/getTokenFromHeader');
const { verifyToken } = require('../utils/verifyToken');

/**
 * Middleware to check if the user is logged in.
 * This middleware extracts the token from the request header,
 * verifies it and adds the decoded user id to the request object.
 * If the token is not valid, it throws an error.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
*/
export const isLoggedIn = async (req, res, next) => {
    // Extract the token from the request header.
    const token = getTokenFromHeader(req);

    // Verify the token.
    const decodedUser = verifyToken(token);
    
    // If the token is not valid, throw an error.
    if (!decodedUser) {
        // Throw an error with a descriptive message.
        throw new Error('Invalid/Expired token, please login again');
    } else {
        // Add the decoded user id to the request object.
        req.userAuthId = decodedUser?.sub;
        
        // Call the next middleware function.
        next();
    }
};
