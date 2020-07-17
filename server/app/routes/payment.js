const User = require('../models/Users')
const stripeconfig = require('../../config/stripe.js')

const stripe = require('stripe')(stripeconfig.secretKey)

module.exports = function (app, logger) {
  // app.get('/api/payment/secret/', async (req, res) => {
  //   stripe.setupIntents.create(
  //     {
  //       // Verify your integration in this guide by including this parameter
  //       metadata: {integration_check: 'accept_a_payment'}
  //     },
  //     ((err, intent) => {
  //       if (err) {
  //         console.log(err.message)
  //         return res.status(500).json({ message: err.message })
  //       }
  //       return res.status(200).json({ intent: intent })
  //     })
  //   )
  // })

  app.get('/api/payment/config', (req, res) => {
    return res.status(200).json({ publicKey: stripeconfig.publicKey, options: stripeconfig.options })
  })

  app.post('/api/payment/confirm', async (req, res, next) => {
    const donation = req.body.data.donation
    const amountInCents = donation.amount * 100.0
    const paymentMethod = req.body.data.paymentMethod
    const token = req.body.data.token
    const email = req.body.data.email
    stripe.paymentIntents.create(
      {
        amount: amountInCents,
        currency: 'usd',
        confirm: true,
        payment_method: paymentMethod,
        receipt_email: email,
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

  // app.post('/api/charge', async (req, res) => {
  //   const stripe = require('stripe')('sk_test_51GqsuDEBGViFyBImr9whAxh3oeFgJ7mqqW9O2O48K5QuOiKi0RGYgUjeRNe6I7uIA28Mz2oyqDR5uUCbqiNMQnU700VPYkm0WM')
  //   console.log(req.body)
  //   const token = req.body.stripeToken
  //   console.log(token)
  //   const charge = await stripe.charges.create({
  //     amount: 999,
  //     currency: 'usd',
  //     description: 'Example charge',
  //     source: token,
  //   })
  //   if (charge.object === "charge") {
  //     console.log(charge)
  //     res.send({ charge: charge })
  //   } else {
  //     console.log('error')
  //     res.send('Error')
  //   }
  // })
}