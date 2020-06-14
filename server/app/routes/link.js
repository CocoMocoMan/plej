const authMiddleware = require('../../config/auth.js')
const User = require('../models/Users')

module.exports = function(app) {
  app.get('/api/generatelinktoken', authMiddleware, (req, res) => {
    let user = req.user
    const linkToken = user.generateToken()
    user.links.push({
      link_token: linkToken
    })
    user.save().
      then(() => {
        console.log(linkToken)
        return res.status(200).send({ success: 'Link Created' })
      })
      .catch(err => {
        return res.status(400).send({ message: 'Unable to create link' })
      })
  })

  app.get('/api/creator/:token', (req, res) => {
    const token = req.params.token
    User.findOne( { 'links.link_token': token} )
      .then(creator => {
        if (!creator) {
          return res.status(400).json({ message: 'Invalid Link' })
        }
        return res.status(200).json({ creator: creator })
      })
      .catch(err => {
        console.log(err)
        return res.status(400).json({ message: err.message })
      })
  })
}