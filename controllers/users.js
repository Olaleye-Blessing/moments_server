import User from "../model/users.js";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utility/catchAsync.js";
import { AppError } from "../utility/AppError.js";

const nodeEnv = process.env.NODE_ENV.trim();

const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

const sendToken = (user, statusCode, res) => {
    let token = signToken(user._id);
    let cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // httpOnly: nodeEnv !== "development",
        // secure: nodeEnv !== "development",
    };

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;

    return res.status(statusCode).json({ status: "success", user });
};

export const signup = catchAsync(async (req, res, next) => {
    let { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName) return next(new AppError("Please provide first name", 400));

    if (!lastName) return next(new AppError("Please provide last name", 400));

    let name = `${firstName} ${lastName}`;

    let user = await User.create({
        name,
        email,
        password,
        confirmPassword,
        // profilePic,
    });

    return sendToken(user, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
    let { email, password } = req.body;

    if (!email || !password)
        return next(new AppError("provide email and password", 400));

    let user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.validatePassword(password, user.password)))
        return next(new AppError("incorrect username or password", 401));

    return sendToken(user, 200, res);
});

export const logout = async (req, res, next) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 1000 * 1),
        httpOnly: nodeEnv !== "development",
    });

    res.status(200).json({ status: "success" });
};
