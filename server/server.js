const express = require('express')
const forceSSL = require('express-force-ssl')
const http = require('http')
const https = require('https')
const fs = require('fs')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const pino = require('pino')
const expressPino = require('express-pino-logger')
const passport = require('passport')
const passportconfig = require('./config/passport')
const mongoose = require('mongoose')
const dbconfig = require('./config/database')
const authRoutes = require('./app/routes/auth')
const linkRoutes = require('./app/routes/link')
const paymentRoutes = require('./app/routes/payment')
const notifyRoutes = require('./app/routes/notify')
const adminRoutes = require('./app/routes/admin')

const app = express()
const port = process.env.PORT || 3000

//logging
const logger = pino({ level: process.env.LOG_LEVEL || 'info' })

//force SSL in production
if (process.env.NODE_ENV === 'production')
  app.use(forceSSL)

//config
passportconfig(passport)
dbconfig(mongoose, logger)

//express setup
app.use(bodyParser.json())
app.use(cookieParser());

//passport/sessions
app.use(session({ secret: 'secret' }));
app.use(passport.initialize())
app.use(passport.session())

//logger express middleware
const expressLogger = expressPino(logger)
app.use(expressLogger)

//routes
authRoutes(app, passport, logger)
linkRoutes(app, logger)
paymentRoutes(app, logger)
notifyRoutes(app, logger)
adminRoutes(app, passport, logger)

//error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  logger.info({ err: err.message })
  let status = err.status || 500
  let message = err.message
  return res.status(status).json({ message: message })
})

//Apple pay verification
app.use(express.static(__dirname + '/.well-known'))
app.get('/.well-known/apple-developer-merchantid-domain-association', (req, res) => res.sendFile(__dirname + '/.well-known/apple-developer-merchantid-domain-association'))

//Handle production
if (process.env.NODE_ENV === 'production') {
  //Static folder
  app.use(express.static(__dirname + '/public'))
  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
  //SSL
  const options = {
    key: fs.readFileSync("/etc/letsencrypt/archive/plej.link/privkey1.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/archive/plej.link/fullchain1.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/archive/plej.link/chain1.pem")
  }
  let httpServer = http.createServer(app);
  let httpsServer = https.createServer(options, app)

  httpServer.listen(80);
  httpsServer.listen(443);
} else {
  app.listen(port, () => logger.info(
    `Listening on port ${port}!`
  ));
}

//serve
