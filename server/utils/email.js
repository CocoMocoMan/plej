const nodemailer = require('nodemailer')
const ejs = require("ejs");

const fromEmail = 'support@plej.link'
const fromPassword = 'Support2020!'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: fromEmail,
    pass: fromPassword
  }
})

module.exports = {
  sendEmail: function (emailInfo) {
    emailInfo.from = fromEmail
    return transporter.sendMail(emailInfo)
      .then((info) => {
        return info.response
      })
      .catch(err => { throw err })
  }
} 