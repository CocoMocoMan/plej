const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const passport = require('passport')
const passportconfig = require('./config/passport')
const mongoose = require('mongoose')
const dbconfig = require('./config/database')
const authRoutes = require('./app/routes/auth')
const linkRoutes = require('./app/routes/link')
const paymentRoutes = require('./app/routes/payment')

const app = express()
const port = process.env.PORT || 3000

//config
passportconfig(passport)
dbconfig(mongoose)

//express setup
app.use(bodyParser.json())
app.use(cookieParser());

//passport/sessions
app.use(session({ secret: 'secret' }));
app.use(passport.initialize())
app.use(passport.session())

//routes
authRoutes(app, passport)
linkRoutes(app)
paymentRoutes(app)

//Apple pay verification
app.use(express.static(__dirname + '/.well-known'))
app.get('/.well-known/apple-developer-merchantid-domain-association', (req, res) => res.sendFile(__dirname + '/.well-known/apple-developer-merchantid-domain-association'))

//Handle production
if(process.env.NODE_ENV === 'production') {
  //Static folder
  app.use(express.static(__dirname + '/public'))
  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

//serve
app.listen(port, () => console.log(
  `Listening on port ${port}!`
));