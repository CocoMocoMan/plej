const authMiddleware = require('../../utils/auth.js')
const User = require('../models/Users')
const validator = require('../../utils/validator')

module.exports = function(app) {
  app.get('/api/link/generatelinktoken', authMiddleware, (req, res) => {
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
      .catch(() => {
        return res.status(500).send({ message: 'Unable to create link' })
      })
  })

  app.get('/api/link/creator/:token', (req, res) => {
    const token = req.params.token
    User.findOne({ 'links.link_token': token})
      .then(creator => {
        if (!creator) {
          return res.status(400).json({ message: 'Invalid Link' })
        }
        creator = creator.publicData()
        const link = creator.links.find(link => {return link.link_token === token})
        return res.status(200).json({ creator: creator, link: link })
      })
      .catch(err => {
        console.log(err)
        return res.status(500).json({ message: err.message })
      })
  })

  app.post('/api/link/addcontent/:token', authMiddleware, async (req, res) => {
    const token = req.params.token
    const link_content = req.body.link_content
    if (!validator.validURL(link_content)) return res.status(500).json({ message: 'Not a valid URL' })
    User.findOneAndUpdate(
      { 'links.link_token': token },
      {
        '$set': {
          'links.$.link_content': link_content
        }
      },
      {new: true}
    )
      .then((user) => {
        const link = user.links.find(link => {return link.link_token === token})
        return res.status(200).send({ link: link} )
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({ message: err.message })
      })
  })
}