import { promisify } from "util";

import jwt from "jsonwebtoken";

import User from "../model/users.js";

export const protect = async (req, res, next) => {
    console.log("protecting...🩸🩸🩸🩸🩸");
    let token = req.cookies.jwt;

    if (!token) {
        console.log("not logged in...🩸🩸🩸🩸");
        return res.status(401).json({
            status: "fail",
            message:
                "You are not logged in! Please login to perform this operation",
        });
    }

    let decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET_KEY
    );

    let { id, iat, exp } = decoded;

    let currentUser = await User.findById(id);

    if (!currentUser) {
        return res.status(404).json({
            status: "fail",
            message: "This account has been deleted! Create another account",
        });
    }
    req.user = currentUser;
    next();
};
