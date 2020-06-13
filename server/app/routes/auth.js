const authMiddleware = require('../../config/auth.js')

module.exports = function(app, passport) {
  app.post('/api/register', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        console.log(err)
        return res.status(400).json({ info })
      }
      if(!user) {
        console.log(info.message)
        return res.status(400).json({ info })
      }
      req.login(user, err => {
        if (err) {
          console.log(err)
          return res.status(400).json({ message: err })
        }
        return res.status(200).json({ success: 'Logged In' })
      })
    })(req, res, next);
  })
  
  app.post('/api/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        console.log(err)
        return res.status(400).json({ info })
      }
      if(!user) {
        console.log(info.message)
        return res.status(400).json({ info })
      }
      req.login(user, err => {
        if (err) {
          console.log(err)
          return res.status(400).json({ message: err })
        }
        return res.status(200).json({ success: 'Logged In' })
      })
    })(req, res, next);
  })
  
  app.get('/api/logout', (req, res) => {
    req.logout();
    console.log('Logged out')
    return res.status(200).json({ success: 'Logged Out' })
  });

  app.get('/api/user', authMiddleware, (req, res) => {
    res.status(200).send({ user: req.user })
  })
}

