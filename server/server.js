const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const passport = require('passport')
const passportconfig = require('./config/passport')
const mongoose = require('mongoose')
const dbconfig = require('./config/database')
const authRoutes = require('./app/routes/auth')
const linkRoutes = require('./app/routes/link')

const app = express()
const port = process.env.PORT || 3000

//config
passportconfig(passport)
dbconfig(mongoose)

//express setup
app.use(bodyParser.json())
app.use(cookieParser());

app.use(session({ secret: 'secret' }));
app.use(passport.initialize())
app.use(passport.session())

//routes
authRoutes(app, passport)
linkRoutes(app)

//serve
app.listen(port, () => console.log(
  `Listening on port ${port}!`
));