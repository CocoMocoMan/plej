const authMiddleware = require('../../utils/auth.js').authMiddleware

module.exports = function (app, passport) {
  app.post('/api/auth/register', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ info })
      }
      if (!user) {
        console.log(info.message)
        return res.status(500).json({ info })
      }
      if (req.user) return res.status(200).json({ success: 'User Created' })
      req.login(user, err => {
        if (err) {
          console.log(err)
          return res.status(500).json({ info: { message: err } })
        }
        return res.status(200).json({ success: 'Logged In' })
      })
    })(req, res, next);
  })

  app.post('/api/auth/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ info })
      }
      if (!user) {
        console.log(info.message)
        return res.status(500).json({ info })
      }
      req.login(user, err => {
        if (err) {
          console.log(err)
          return res.status(500).json({ info: { message: err } })
        }
        return res.status(200).json({ success: 'Logged In' })
      })
    })(req, res, next);
  })

  app.get('/api/auth/logout', (req, res, next) => {
    req.logout();
    console.log('Logged out')
    return res.status(200).json({ success: 'Logged Out' })
  });

  app.get('/api/auth/user', authMiddleware, (req, res, next) => {
    res.status(200).send({ user: req.user })
  })
}

