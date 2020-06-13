
module.exports = function authMiddleware (req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: 'You are not authenticated'})
  } else {
    return next()
  }
}