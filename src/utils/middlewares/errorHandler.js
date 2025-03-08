export function errorHandler(err, req, res, next) {
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";

    res.status(statusCode).json({error: message});
}