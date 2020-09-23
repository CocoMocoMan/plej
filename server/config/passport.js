const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const googleConfig = require('./google')
const facebookConfig = require('./facebook')
const twitterConfig = require('./twitter')
const User = require('../app/models/Users')
const validator = require('../utils/validator')
const adminUser = require('./admin')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {

      //sort donations and links by date
      const sortByDate = function (a, b) {
        return new Date(b.date) - new Date(a.date);
      }
      if (user.links) {
        user.links.sort(sortByDate)
        if (user.links.donations) user.links.donations.sort(sortByDate)
      }

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
      if (!validator.validPassword(password)) return done(null, false, { message: 'Not a valid password' })
      User.findOne({ email: email })
        .then(user => {
          if (user) {
            return done(null, false, { message: 'That email is already taken' })
          }
          else {
            const newUser = new User()
            newUser.email = email
            newUser.password = newUser.generateHash(password)
            newUser.name = req.body.name
            newUser.alias = req.body.alias
            newUser
              .save()
              .then(user => {
                user.addStripeAccount()
                return done(null, user)
              })
              .catch(err => {
                return done(err, false, { message: 'Failed to connect to database' })
              })
          }
        })
        .catch(err => {
          return done(err, false, { message: 'Failed to retrieve from database' })
        })
    })
  )

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'No user found' })
        }
        let notLocal = user.google_id || user.facebook_id || user.twitter_id
        if (notLocal) {
          return done(null, false, { message: 'Your email is registered with a Google, Facebook, or Twitter account' })
        }
        if (!user.checkPassword(password)) {
          return done(null, false, { message: 'Wrong password' })
        }
        if (!user.stripe_id) {
          user.addStripeAccount()
        }
        return done(null, user)
      })
      .catch(err => {
        return done(err, false, { message: 'Failed to retrieve from database' })
      })
  })
  )

  passport.use('local-admin-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    let validLogin = email === adminUser.email
    if (!validLogin) {
      return done(null, false, { message: 'No user found' })
    }
    let validPassword = password === adminUser.password
    if (!validPassword) {
      return done(null, false, { message: 'Wrong password' })
    }
    User.findOne({ email: adminUser.email })
      .then((user) => {
        if (!user) {
          let newUser = new User()
          newUser.email = adminUser.email
          newUser.password = newUser.generateHash(adminUser.password)
          newUser.name = adminUser.name
          newUser.alias = adminUser.alias
          newUser
            .save()
            .then(user => {
              return done(null, user)
            })
            .catch(err => {
              return done(err, false, { message: 'Failed to connect to database' })
            })
        } else {
          return done(null, user)
        }
      })
  })
  )

  passport.use(new GoogleStrategy({
    clientID: googleConfig.clientID,
    clientSecret: googleConfig.clientSecret,
    callbackURL: googleConfig.callbackURL
  },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile._json.email })
        .then((user) => {
          if (!user) {
            let newUser = new User()
            newUser.google_id = profile.id
            newUser.email = profile._json.email
            newUser.alias = profile.displayName
            newUser.name = profile.name.givenName + ' ' + profile.name.familyName
            newUser.
              save()
              .then(user => {
                user.addStripeAccount()
                return done(null, user)
              })
              .catch(err => {
                return done(err, false, { message: 'Failed to connect to database' })
              })
          }
          else {
            if (!user.stripe_id) {
              user.addStripeAccount()
            }
            if (!user.google_id) {
              user.google_id = profile.id
              user.save()
                .then(user => {
                  return done(null, user)
                })
            }
            else return done(null, user)
          }
        })
    }
  ))

  passport.use(new FacebookStrategy({
    clientID: facebookConfig.appID,
    clientSecret: facebookConfig.appSecret,
    callbackURL: facebookConfig.callbackURL,
    profileFields: ['id', 'emails', 'name']
  },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value })
        .then((user) => {
          if (!user) {
            let newUser = new User()
            newUser.facebook_id = profile.id
            newUser.email = profile.emails[0].value
            newUser.alias = profile.displayName
            newUser.name = profile.name.givenName + ' ' + profile.name.familyName
            newUser.
              save()
              .then(user => {
                user.addStripeAccount()
                return done(null, user)
              })
              .catch(err => {
                return done(err, false, { message: 'Failed to connect to database' })
              })
          }
          else {
            if (!user.stripe_id) {
              user.addStripeAccount()
            }
            if (!user.facebook_id) {
              user.facebook_id = profile.id
              user.save()
                .then(user => {
                  return done(null, user)
                })
            }
            else return done(null, user)
          }
        })
    }
  ))

  passport.use(new TwitterStrategy({
    consumerKey: twitterConfig.consumerKey,
    consumerSecret: twitterConfig.consumerSecret,
    callbackURL: twitterConfig.callbackURL,
    userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
  },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value })
        .then((user) => {
          if (!user) {
            let newUser = new User()
            newUser.twitter_id = profile.id
            newUser.email = profile.emails[0].value
            newUser.alias = profile.username
            newUser.name = profile.displayName
            newUser.
              save()
              .then(user => {
                user.addStripeAccount()
                return done(null, user)
              })
              .catch(err => {
                return done(err, false, { message: 'Failed to connect to database' })
              })
          }
          else {
            if (!user.stripe_id) {
              user.addStripeAccount()
            }
            if (!user.twitter_id) {
              user.twitter_id = profile.id
              user.save()
                .then(user => {
                  return done(null, user)
                })
            }
            else return done(null, user)
          }
        })
    }
  ))
}