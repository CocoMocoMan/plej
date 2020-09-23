const adminUser = require('../config/admin')

module.exports = {
  authMiddleware: function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: 'You are not authenticated' })
    } else {
      return next()
    }
  },

  adminMiddleWare: function (req, res, next) {
    const user = req.user
    if (!user || !(user.email === adminUser.email && user.checkPassword(adminUser.password))) {
      res.status(401).json({ message: 'You are not authenticated' })
    } else {
      return next()
    }
  }
}