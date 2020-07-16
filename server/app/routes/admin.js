const adminMiddleWare = require('../../utils/auth.js').adminMiddleWare
const User = require('../models/Users')
const Lead = require('../models/Leads')

module.exports = function (app, passport) {
  app.post('/api/admin/login', (req, res, next) => {
    passport.authenticate('local-admin-login', (err, user, info) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ info })
      }
      if (!user) {
        console.log(info.message)
        return res.status(500).json({ info })
      }
      req.login(user, err => {
        if (err) {
          console.log(err)
          return res.status(500).json({ info: { message: err } })
        }
        return res.status(200).json({ success: 'Logged In' })
      })
    })(req, res, next);
  })

  app.get('/api/admin/auth', adminMiddleWare, (req, res) => {
    res.status(200).send({ user: req.user })
  })

  app.get('/api/admin/users', adminMiddleWare, (req, res) => {
    User.find()
      .then(users => {
        res.status(200).send({ users: users })
      })
      .catch(err => {
        res.status(500).send({ message: err.message })
      })
  })

  app.get('/api/admin/user/:userid', adminMiddleWare, (req, res) => {
    const userID = req.params.userid
    User.findById(userID)
      .then(user => {
        res.status(200).send({ user: user })
      })
      .catch(err => {
        res.status(500).send({ message: err.message })
      })
  })

  app.get('/api/admin/generatelinktoken/:userid', adminMiddleWare, (req, res) => {
    const userID = req.params.userid
    User.findById(userID)
      .then(user => {
        const linkToken = user.generateToken()
        user.links.push({
          link_token: linkToken
        })
        user.save()
          .then(() => {
            console.log(linkToken)
            return res.status(200).send({ success: 'Link Created' })
          })
          .catch(() => {
            return res.status(500).send({ message: 'Unable to create link' })
          })
      })
  })

  app.post('/api/admin/addcontent/:token', adminMiddleWare, async (req, res) => {
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
      { new: true }
    )
      .then((user) => {
        const link = user.links.find(link => { return link.link_token === token })
        return res.status(200).send({ link: link })
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({ message: err.message })
      })
  })

  app.get('/api/admin/leads', adminMiddleWare, (req, res) => {
    Lead.find()
      .then(leads => {
        return res.status(200).send({ leads: leads })
      })
      .catch(err => {
        return res.status(500).send({ message: err.message })
      })
  })
  app.get('/api/admin/resolvelead/:leadid', adminMiddleWare, (req, res) => {
    const leadID = req.params.leadid
    Lead.findByIdAndUpdate(leadID, { resolved: true })
      .then(() => {
        return res.status(200).send({ success: 'Lead Resolved' })
      })
      .catch(err => {
        return res.status(500).send({ message: err.message })
      })
  })

  app.get('/api/admin/unresolvelead/:leadid', adminMiddleWare, (req, res) => {
    const leadID = req.params.leadid
    Lead.findByIdAndUpdate(leadID, { resolved: false })
      .then(() => {
        return res.status(200).send({ success: 'Lead Unresolved' })
      })
      .catch(err => {
        return res.status(500).send({ message: err.message })
      })
  })
}

