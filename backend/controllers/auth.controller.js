import { default as User } from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: " ", url: " " },
  });

  const token = user.getJwtToken();

  res.status(201).json({ success: true, token });
});

// Login user => /api/v1/login

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // validate empty inputs
  if (!email || !password) {
    return next(new ErrorHandler("Please enter your email and password", 400));
  }

  // validate if user exists in the database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // validate if password is correct
  const isPasswordsCorrect = await user.checkPassword(password);

  if (!isPasswordsCorrect) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = user.getJwtToken();
  res.status(200).json({ success: true, token });
});
