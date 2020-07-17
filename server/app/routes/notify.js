const Lead = require('../models/Leads')
const emailService = require('../../utils/email')

module.exports = function (app, logger) {
  app.post('/api/notify/contactus', (req, res, next) => {
    const lead = req.body
    Lead.addItem(lead, err => {
      if (err) {
        return next(err)
      }
      const emailInfo = {
        to: lead.email,
        subject: `Thanks for reaching out, ${lead.fName}`,
        html: '<h1>Welcome to Plej</h1><p>A member of our team will be in touch soon!</p>'
      }
      emailService.sendEmail(emailInfo)
        .then(response => {
          logger.warn({
            action: 'Lead Email Sent',
            data: {
              email: response,
              lead: lead
            }
          })
          return res.status(200).json({ success: 'success' })
        })
        .catch(err => {
          return next(err)
        })

    })
  })
}