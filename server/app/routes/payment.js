module.exports = function(app) {
  app.get('/api/payment/secret/:amount', async (req, res) => {
    const stripe = require('stripe')('sk_test_51GqsuDEBGViFyBImr9whAxh3oeFgJ7mqqW9O2O48K5QuOiKi0RGYgUjeRNe6I7uIA28Mz2oyqDR5uUCbqiNMQnU700VPYkm0WM')
    const amountInCents = req.params.amount * 100.0
    const intent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      // Verify your integration in this guide by including this parameter
      metadata: {integration_check: 'accept_a_payment'},
    });
    // if (intent.error) return res.status(400).json({ message: intent.error })
    return res.status(200).json({client_secret: intent.client_secret})
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