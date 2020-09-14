const User = require('../models/Users')
const authMiddleware = require('../../utils/auth.js').authMiddleware
const stripeconfig = require('../../config/stripe.js')

const stripe = require('stripe')(stripeconfig.secretKey)

module.exports = function (app, logger) {
  app.get('/api/payment/config', (req, res) => {
    return res.status(200).json({ publicKey: stripeconfig.publicKey, options: stripeconfig.options })
  })

  app.post('/api/payment/confirm', (req, res, next) => {
    const donation = req.body.data.donation
    const amountInCents = donation.amount * 100.0
    const paymentMethod = req.body.data.paymentMethod
    const token = req.body.data.token
    const email = req.body.data.email
    //calcualte transaction fees
    const stripeFee = 30 + (amountInCents * .029)
    const amountAfterStripeFee = amountInCents - stripeFee
    const plejFee = 10 + (amountAfterStripeFee * .05)
    totalFee = plejFee + stripeFee
    totalFee = Math.round(totalFee)
    User.findOne({ 'links.link_token': token })
      .then((creator) => {
        console.log(creator.stripe_id)
        stripe.paymentIntents.create(
          {
            amount: amountInCents,
            currency: 'usd',
            confirm: true,
            payment_method: paymentMethod,
            receipt_email: email,
            application_fee_amount: totalFee,
            transfer_data: {
              destination: creator.stripe_id
            },
            metadata: { link: token }
          },
          ((err, intent) => {
            if (err) {
              return next(err)
            }
            User.findOneAndUpdate(
              { 'links.link_token': token },
              {
                '$push': {
                  'links.$.donations': donation
                }
              }
            )
              .then((user) => {
                logger.warn({
                  action: 'Payment Proccessed',
                  data: {
                    payment: {
                      intent: intent,
                      creator: user.email,
                      donation: donation
                    }
                  }
                })
                return res.status(200).json({ intent: intent })
              })
              .catch((err) => {
                return next(err)
              })
          })
        )
      })
  })

  app.get('/api/payment/accountlink', authMiddleware, (req, res, next) => {
    let user = req.user
    stripe.accountLinks.create({
      account: user.stripe_id,
      refresh_url: 'http://localhost:3000/api/payment/accountlinkrefresh',
      return_url: 'http://localhost:8080/dashboard',
      type: 'account_onboarding'
    })
      .then((link) => {
        res.status(200).json({ accountLink: link.url })
      })
      .catch((err) => {
        return next(err)
      })
  })

  app.get('/api/payment/accountlinkrefresh', authMiddleware, (req, res, next) => {
    let user = req.user
    stripe.accountLinks.create({
      account: user.stripe_id,
      refresh_url: 'http://localhost:3000/api/payment/accountlinkrefresh',
      return_url: 'http://localhost:8080/paymentsetup',
      type: 'account_onboarding'
    })
      .then((link) => {
        res.redirect(link.url)
      })
      .catch((err) => {
        return next(err)
      })
  })

  app.get('/api/payment/account', authMiddleware, (req, res, next) => {
    let user = req.user
    stripe.account.retrieve(user.stripe_id)
      .then((account) => {
        res.status(200).json({ account: account })
      })
      .catch((err) => {
        return next(err)
      })
  })
}