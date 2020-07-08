const nodemailer = require('nodemailer')

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
    transporter.sendMail(emailInfo, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
} 