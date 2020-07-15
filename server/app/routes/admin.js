module.exports = function(app, passport) {
  app.post('/api/admin/login', (req, res, next) => {
    passport.authenticate('local-admin-login', (err, user, info) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ info })
      }
      if(!user) {
        console.log(info.message)
        return res.status(500).json({ info })
      }
      req.login(user, err => {
        if (err) {
          console.log(err)
          return res.status(500).json({ info: { message: err }})
        }
        return res.status(200).json({ success: 'Logged In' })
      })
    })(req, res, next);
  })
}

