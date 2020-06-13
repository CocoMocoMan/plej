const authMiddleware = require('../../config/auth.js')
const User = require('../models/Users')

module.exports = function(app) {
  app.get('/api/generatelinktoken', authMiddleware, (req, res) => {
    let user = req.user
    const linkToken = user.generateToken()
    user.links.push({
      linkToken: linkToken
    })
    user.save()
    console.log(linkToken)
    res.status(200).send({ linkToken: linkToken })
  })

  app.get('/api/creator/:token', (req, res) => {
    const token = req.params.token
    User.findOne( { 'links.link_token': token} )
      .then(creator => {
        if (!creator) {
          res.status(400).json({ message: 'Invalid Link' })
        }
        res.status(200).json( { creator: creator })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ message: err.message })
      })
  })
}