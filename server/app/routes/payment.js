module.exports = function(app) {
  app.post('/api/charge', async (req, res) => {
    const stripe = require('stripe')('sk_test_51GqsuDEBGViFyBImr9whAxh3oeFgJ7mqqW9O2O48K5QuOiKi0RGYgUjeRNe6I7uIA28Mz2oyqDR5uUCbqiNMQnU700VPYkm0WM')
    console.log(req.body)
    const token = req.body.stripeToken
    console.log(token)
    const charge = await stripe.charges.create({
      amount: 999,
      currency: 'usd',
      description: 'Example charge',
      source: token,
    })
    if (charge.object === "charge") {
      console.log(charge)
      res.send({ charge: charge })
    } else {
      console.log('error')
      res.send('Error')
    }
  })
}