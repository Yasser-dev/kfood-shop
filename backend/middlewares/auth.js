//  Check if user is authenticated
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "./catchAsyncErrors";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return next(
      new ErrorHandler("You need to be logged in to access this resource", 401)
    );

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = User.findById(decoded.id);
  next();
});
