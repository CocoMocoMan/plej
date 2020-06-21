const User = require('../app/models/Users')
const LocalStrategy = require('passport-local').Strategy
const validator = require('../utils/validator')

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  }) 

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, 
  (req, email, password, done) => {
    if (!validator.validEmail(email)) return done(null, false, { message: 'Not a valid email' })
    User.findOne( { email: email })
      .then(user=> {
        if (user) {
          return done(null, false, { message: 'That email is already taken' })
        } else {
          const newUser = new User()
          newUser.email = email
          newUser.password = newUser.generateHash(password)
          newUser.name = req.body.name
          newUser.alias = req.body.alias
          newUser
            .save()
            .then(user => {
              return done(null, user)
            })
            .catch(err => {
              return done(err, false, { message:  'Failed to connect to database' })
            })
        }
      })
      .catch(err => {
        return done(err, false, {message: 'Failed to retrieve from database' })
      })
    })
  )
  
  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
    }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'No user found' })
          } 
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Wrong password' })
          }
          return done(null, user)
        })
        .catch(err => {
          return done(err, false, {message: 'Failed to retrieve from database' })
        })
    })
  )
}