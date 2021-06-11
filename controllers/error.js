// import { AppError } from "../utility/AppError.js";

const handleDBValidationError = (err) => {
    let { errors: allErrors } = err;

    let keyErrorsMessages = Object.keys(allErrors)
        .map((e) => allErrors[e].properties.message)
        .join(". ");

    return keyErrorsMessages;
};

export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (err.name === "ValidationError") {
        err.message = handleDBValidationError(err);
        err.statusCode = 400;
    }

    console.log({ ...err });

    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message || "something went wrong",
    });
};
