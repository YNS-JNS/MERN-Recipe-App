exports.notFound = (req, res, next) => {

    const error = new Error(`Route ${req.originalUrl} not found!`);
    res.status(404);
    next(error);
};

exports.globalErrhandler = (err, req, res, next) => {

    const stack = err?.stack;
    const statusCode = res?.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err?.message,
        stack,
    });
}