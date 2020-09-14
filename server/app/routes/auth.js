const authMiddleware = require('../../utils/auth.js').authMiddleware
const url = require('../../config/url')

module.exports = function (app, passport) {
  app.get('/api/auth/user', authMiddleware, (req, res, next) => {
    res.status(200).json({ user: req.user })
  })

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
    })(req, res, next)
  })

  app.get('/api/auth/logout', (req, res, next) => {
    req.logout();
    console.log('Logged out')
    return res.status(200).json({ success: 'Logged Out' })
  });

  app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  app.get('/api/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }))

  app.get('/api/auth/twitter', passport.authenticate('twitter', { scope: ['email'] }))

  app.get('/api/auth/google/callback', passport.authenticate('google', { successRedirect: `${url}/dashboard`, failureRedirect: `${url}/login/err` }))

  app.get('/api/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: `${url}/dashboard`, failureRedirect: `${url}/login/err` }))

  app.get('/api/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: `${url}/dashboard`, failureRedirect: `${url}/login/err` }))
}

