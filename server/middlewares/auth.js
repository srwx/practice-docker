const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    // User not login
    return res.status(401).json({
      success: false,
      message: "Unauthorized, Please login and try again.",
    })
  } else {
    // User already logged-in
    next()
  }
}

module.exports = checkAuth
