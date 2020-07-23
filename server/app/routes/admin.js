const adminMiddleWare = require('../../utils/auth.js').adminMiddleWare
const User = require('../models/Users')
const Lead = require('../models/Leads')
const link = require('./link.js')

module.exports = function (app, passport, logger) {
  app.post('/api/admin/login', (req, res, next) => {
    passport.authenticate('local-admin-login', (err, user, info) => {
      if (err) {
        logger.error(err)
        return res.status(500).json({ info })
      }
      if (!user) {
        logger.error(info.message)
        return res.status(500).json({ info })
      }
      req.login(user, err => {
        if (err) {
          logger.error(err)
          return res.status(500).json({ info: { message: err } })
        }
        return res.status(200).json({ success: 'Logged In' })
      })
    })(req, res, next);
  })

  app.get('/api/admin/auth', adminMiddleWare, (req, res) => {
    return res.status(200).json({ user: req.user })
  })

  app.get('/api/admin/users', adminMiddleWare, (req, res) => {
    User.find()
      .then(users => {
        return res.status(200).json({ users: users })
      })
      .catch(err => {
        return next(err)
      })
  })

  app.get('/api/admin/user/:userid', adminMiddleWare, (req, res, next) => {
    const userID = req.params.userid
    User.findById(userID)
      .then(user => {
        return res.status(200).json({ user: user })
      })
      .catch(err => {
        return next(err)
      })
  }),

    app.get('/api/admin/deleteuser/:userid', adminMiddleWare, (req, res, next) => {
      const userID = req.params.userid
      User.findByIdAndDelete(userID)
        .then(() => {
          return res.status(200).json({ success: 'User Deleted' })
        })
        .catch(err => {
          return next(err)
        })
    })

  app.get('/api/admin/generatelinktoken/:userid', adminMiddleWare, (req, res, next) => {
    const userID = req.params.userid
    User.findById(userID)
      .then(user => {
        const linkToken = user.generateToken()
        user.links.push({
          link_token: linkToken
        })
        user.save()
          .then((user) => {
            logger.warn({
              action: 'Link Generated',
              data: {
                token: linkToken,
                for: user.email,
                admin: true
              }
            })
            return res.status(200).send({ success: 'Link Created' })
          })
          .catch(() => {
            let err = new Error('Unable to create link')
            return next(err)
          })
      })
  })

  app.get('/api/admin/deletelink/:token', adminMiddleWare, (req, res, next) => {
    const token = req.params.token
    User.findOne({ 'links.link_token': token })
      .then((user) => {
        user.links = user.links.filter(link => link.link_token !== token)
        return user.save()
      })
      .then(() => {
        return res.status(200).json({ success: 'Link Deleted' })
      })
      .catch(err => {
        return next(err)
      })
  })

  app.post('/api/admin/addcontent/:token', adminMiddleWare, async (req, res, next) => {
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
      }
    )
      .then((user) => {
        const link = user.links.find(link => { return link.link_token === token })
        logger.warn({
          action: 'Link Content Added',
          data: {
            for: user.email,
            link: link.link_token,
            admin: true
          }
        })
        return res.status(200).json({ link: link })
      })
      .catch((err) => {
        console.log(err)
      })
  })

  app.get('/api/admin/leads', adminMiddleWare, (req, res, next) => {
    Lead.find()
      .then(leads => {
        return res.status(200).json({ leads: leads })
      })
      .catch(err => {
        return next(err)
      })
  })
  app.get('/api/admin/resolvelead/:leadid', adminMiddleWare, (req, res, next) => {
    const leadID = req.params.leadid
    Lead.findByIdAndUpdate(leadID, { resolved: true })
      .then(() => {
        return res.status(200).json({ success: 'Lead Resolved' })
      })
      .catch(err => {
        return next(err)
      })
  })

  app.get('/api/admin/unresolvelead/:leadid', adminMiddleWare, (req, res, next) => {
    const leadID = req.params.leadid
    Lead.findByIdAndUpdate(leadID, { resolved: false })
      .then(() => {
        return res.status(200).json({ success: 'Lead Unresolved' })
      })
      .catch(err => {
        return next(err)
      })
  })
}

