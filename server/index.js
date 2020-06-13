// const express = require('express')
// const cookieSession = require('cookie-session')
// const bodyParser = require('body-parser')
// const passport = require('passport')
// const mysql = require('mysql')

// const app = express()
// const port = 3000
// const con = mysql.createConnection({
//   host: process.env.DATABASE_HOST || '127.0.0.1',
//   user: "root",
//   password: "password",
//   database: "plejdb",
//     port: 3306
// })
// const LocalStrategy = require('passport-local').Strategy // getting the local authentication type


// app.use(bodyParser.json())

// app.use(cookieSession({
//   name: 'mysession',
//   keys: ['vueauthrandomkey'],
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))

// app.use(passport.initialize())
// app.use(passport.session())



// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })

// passport.deserializeUser((id, done) => {
//   const query = `SELECT * FROM User WHERE User.UserID = ${ id } AND User.Active = true`;
//   con.query(query, (err, results) => {
//     let user = results[0]
//     done(null, user)
//   })
// })

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password'
//     },

//     (username, password, done) => {
//       const query = `SELECT * FROM User WHERE User.Username = ${ username } AND User.Password = ${ password } AND User.Active = true`;
//       con.query(query, (err, results) => {
//         if(err) {
//           done(null, false, { message: err.message})
//         } else if (results.length == 0) {
//           done(null, false, { message: 'Incorrect username or password'})
//         } else {
//           let user = results[0]
//           done(null, user)
//         }
//       });
//     }
//   )
// )

// //temp db
// let users = [
//   {
//     id: 1,
//     name: 'Jude',
//     email: 'user@email.com',
//     password: 'password'
//   },
//   {
//     id: 2,
//     name: 'Emma',
//     email: 'emma@email.com',
//     password: 'password2'
//   }
// ]

// app.post('/api/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) {
//       return next(err);
//     }

//     if (!user) {
//       return res.status(400).send([user, 'Cannot log in', info]);
//     }

//     req.login(user, err => {
//       res.send('Logged in');
//     });
//   })(req, res, next);
// })

// app.get('/api/logout', function(req, res) {
//   req.logout();

//   console.log('logged out')

//   return res.send();
// });

// app.get('/api/user', authMiddleware, (req, res) => {
//   if (!req.user) {
//     let err = 'User Not Found'
//     console.log(err)
//     res.status(400).send(['Error', err])
//   }
  
//   console.log([user, req.session])
//   res.status(200).send({ user: req.user })
// })

// app.get('/api/generatelinktoken', authMiddleware, (req, res) => {
//   if (!req.user) {
//     let err = 'User Not Found'
//     console.log(err)
//     res.status(400).send(['Error', err])
//   }

//   const linkToken = randomToken()

//   const link = {
    
//   }



//   const query = 'INSERT INTO Link '


//   console.log(linkToken)

//   res.send({ linkToken: linkToken })
// })

// app.get('/api/creator/:token', (req, res) => {
//   let token = req.params.token;

//   let creator = users.find(user => {
//     return user.linkToken === token
//   })

//   if (!creator) {
//     return res.status(400).send([creator, 'No user found for token']);
//   }

//   console.log(creator)

//   res.send({ creator: creator })
// })

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

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   app.listen(port, () => console.log(`Listening on port ${port}`));
// });

// function randomToken() {
//   let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   let length = randomInt(8, 4);
//   return randomString(length, chars);
// }

// function randomString(length, chars) {
//   var result = ''
//   for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
//   return result
// }

// function randomInt(min, range) {
//   return Math.floor(Math.random() * range + min)
// }


