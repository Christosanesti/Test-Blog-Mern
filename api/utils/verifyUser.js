import jwt from 'jsonwebtoken'
import {errorHandler} from './error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'دسترسی شما به این بخش محدود شده است'));
    }
}   
jwt.verifyToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
        return next(errorHandler(403, 'دسترسی شما به این بخش محدود شده است'));
    }
    req.user = user;
    next();
  };
