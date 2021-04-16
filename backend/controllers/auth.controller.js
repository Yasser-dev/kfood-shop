import { default as User } from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { sendToken } from "../utils/jwtToken";
import { sendEmail } from "../utils/sendEmail";
//Register User => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: " ", url: " " },
  });

  sendToken(user, 200, res);
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

  sendToken(user, 200, res);
});

//  Forgot Password => /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create Password reset Url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset link is:\n\n
  ${resetUrl}\n\n
  if you did not request to reset your password please contact us!\n\n
  Thanks, Kfood Shop Team
  `;
  try {
    await sendEmail({
      email: user.email,
      subject: "Kfood Shop Password Reset!",
      message,
    });
    res
      .status(200)
      .json({ success: true, message: `Email sent to: ${user.email}` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    next(new ErrorHandler(error.message, 500));
  }
});

// Logout User => /api/v1/logout
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User Logged Out successfully",
  });
});
