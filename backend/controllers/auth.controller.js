import crypto from "crypto";
import cloudinary from "cloudinary";
import User from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { sendToken } from "../utils/jwtToken";
import { sendEmail } from "../utils/sendEmail";

//Register User => /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
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
  const resetUrl = `${process.env.FRONT_END_URL}/password/reset/${resetToken}`;

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

//  Forgot Password => /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get current logged in user => /api/v1/currentuser
export const getCurrentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});

// Update Password => /api/v1/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  //  validate old password
  const isValid = await user.checkPassword(req.body.oldPassword);

  if (!isValid) {
    return next(new ErrorHandler("This is not your current password", 404));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

// Update current user's profile info => /api/v1/currentuser/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // Update avatar
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const image_id = user.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res
    .status(200)
    .json({ success: true, message: "User updated successfully." });
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

// Admin Routes

// Get all users => /api/v1/admin/users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
});

// Get user by id => /api/v1/admin/users/:id
export const getUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User with id: ${req.params.id} could not be found`, 404)
    );
  }
  res.status(200).json({ success: true, user });
});

// Update user by id => /api/v1/admin/users/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res
    .status(200)
    .json({ success: true, message: "User updated successfully.", user });
});

// Delete user => /api/v1/admin/users/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // TODO: Remove avatar from cloud storage

  await user.remove();

  res.status(200).json({ success: true, message: "User deleted" });
});
