// Create and return cookie then save it in the cookie

export const sendToken = (user, statusCode, res) => {
  // create jwt token
  const token = user.getJwtToken();

  // cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};
