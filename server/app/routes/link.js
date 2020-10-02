const authMiddleware = require('../../utils/auth.js').authMiddleware
const User = require('../models/Users')
const validator = require('../../utils/validator')

module.exports = function (app, logger) {
  app.get('/api/link/generatelinktoken', authMiddleware, (req, res, next) => {
    let user = req.user
    const linkToken = user.generateToken()
    user.links.push({
      link_token: linkToken
    })
    user.save().
      then((user) => {
        logger.warn({
          action: 'Link Generated',
          data: {
            token: linkToken,
            for: user.email
          }
        })
        return res.status(200).json({ success: 'Link Created' })
      })
      .catch(() => {
        let err = new Error('Unable to create link')
        return next(err)
      })
  })

  app.get('/api/link/creator/:token', (req, res, next) => {
    const token = req.params.token
    User.findOneAndUpdate({ 'links.link_token': token }, { '$inc': { 'links.$.page_visits': 1 } })
      .then(creator => {
        if (!creator) {
          let err = new Error('Invalid Link')
          err.status = 400
          return next(err)
        }
        const link = creator.links.find(link => { return link.link_token === token })
        logger.warn({
          action: 'Donation Page Visited',
          data: {
            creator: creator.email,
            link: link.link_token
          }
        })
        creator = creator.publicData()
        return res.status(200).json({ creator: creator, link: link })
      })
      .catch(err => {
        return next(err)
      })
  })

  app.post('/api/link/addcontent/:token', authMiddleware, async (req, res, next) => {
    const token = req.params.token
    const link_content = req.body.link_content
    if (!validator.validURL(link_content)) {
      let err = new Error('Not a valid URL')
      err.status = 400
      return next(err)
    }
    User.findOneAndUpdate(
      { 'links.link_token': token },
      {
        '$set': {
          'links.$.link_content': link_content
        }
      },
      { new: true }
    )
      .then((user) => {
        const link = user.links.find(link => { return link.link_token === token })
        logger.warn({
          action: 'Link Content Added',
          data: {
            for: user.email,
            link: link.link_token
          }
        })
        return res.status(200).json({ link: link })
      })
      .catch((err) => {
        return next(err)
      })
  })
}