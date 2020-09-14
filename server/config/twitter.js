let consumerKey = 'KJWc6M4cQPP2DqqqgU4MQndEm'
let consumerSecret = 'YkEKqTebUzNALPgiRt2zjXraMjOmXRx7TkV2V9rbtFkTZEfJ5T'
let callbackURL = 'http://localhost:3000/api/auth/twitter/callback'

if (process.env.NODE_ENV === 'production') {
  callbackURL = 'https://plej.link/api/auth/twitter/callback'
}

module.exports = {
  consumerKey: consumerKey,
  consumerSecret: consumerSecret,
  callbackURL: callbackURL
}
