let appID = '936468733520597'
let appSecret = '32813cc4b018ed9e8429703971c00ef0'
let callbackURL = 'http://localhost:3000/api/auth/facebook/callback'

if (process.env.NODE_ENV === 'production') {
  callbackURL = 'https://plej.link/api/auth/facebook/callback'
  appID = '734392934071643'
  appSecret = '42ebc682404d443cf60f0cbe92f43c87'
}

module.exports = {
  appID: appID,
  appSecret: appSecret,
  callbackURL: callbackURL
}
