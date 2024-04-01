/**
 * Function to extract the token from the request header.
 *
 * @param {Object} req - The request object containing the headers.
 * @returns {string|undefined} - The token extracted from the header, or an error message if no token is found.
 */
export const getTokenFromHeader = (req) => {
    // Check if the request object and headers exist, and if so, extract the token from the authorization header.
    // The token is expected to be in the format 'Bearer <token>', so we split the string and take the second part.

    const token = req?.headers?.authorization?.split(" ")[1];

    // If no token is found, return an error message. Otherwise, return the token.
    return token === undefined ? "No token found in the header" : token;
}
