const Lead = require('../models/Leads')
const emailService = require('../../utils/email')

module.exports = function (app) {
  app.post('/api/notify/contactus', (req, res) => {
    const lead = req.body
    Lead.addItem(lead, err => {
      if (err) {
        return res.status(500).json({ message: err.message })
      }
      const emailInfo = {
        to: lead.email,
        subject: `Thanks for reaching out, ${lead.fName}`,
        html: '<h1>Welcome to Plej</h1><p>A member of our team will be in touch soon!</p>'
      }
      emailService.sendEmail(emailInfo)
      return res.status(200).json({ success: 'success' })
    })
  })
}