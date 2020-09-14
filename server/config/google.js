let clientID = '1057297916998-asli2a59r53c6tv0mdf5r0et3pc620dk.apps.googleusercontent.com'
let clientSecret = 'EzmP71risulNfJhjuPvQE7di'
let callbackURL = 'http://localhost:3000/api/auth/google/callback'

if (process.env.NODE_ENV === 'production') {
  callbackURL = 'https://plej.link/api/auth/google/callback'
}

module.exports = {
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: callbackURL
}
