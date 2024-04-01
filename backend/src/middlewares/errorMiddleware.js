/**
 * Middleware function to handle requests to non-existent routes.
 * It creates a new error object, sets its message to indicate
 * that the requested route does not exist, sets the response status
 * to 404 (Not Found) and passes the error to the next middleware.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.notFound = (req, res, next) => {
    // Create a new error object
    const error = new Error(`Route ${req.originalUrl} not found!`);

    // Set the response status to 404 (Not Found)
    res.status(404);

    // Pass the error to the next middleware
    next(error);
};

/**
 * Middleware function to handle global errors.
 * It handles errors by setting the response status and
 * sending a JSON object with the error message and stack trace.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
*/
exports.globalErrhandler = (err, req, res, next) => {
    // Extract the stack trace from the error object
    const stack = err?.stack;

    // Set the response status to 500 (Internal Server Error) if the initial status is 200,
    // otherwise keep the initial status.
    const statusCode = res?.statusCode === 200 ? 500 : res.statusCode;

    // Send a JSON response with the error message and stack trace
    res.status(statusCode).json({
        success: false, // Indicates that the request was not successful
        message: err?.message, // The error message
        stack, // The stack trace
    });
}