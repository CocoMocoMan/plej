const express = require('express')
 
// creating an express instance
const app = express()
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy

app.use(bodyParser.json())

app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize())
app.use(passport.session())


const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated')
  } else {
    return next()
  }
}

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  let user = users.find((user) => {
    return user.id === id
  })

  done(null, user)
})

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },

    (username, password, done) => {
      let user = users.find((user) => {
        return user.email === username && user.password === password
      })

      if (user) {
        done(null, user)
      } else {
        done(null, false, { message: 'Incorrect username or password'})
      }
    }
  )
)

//temp db
let users = [
  {
    id: 1,
    name: 'Jude',
    email: 'user@email.com',
    password: 'password'
  },
  {
    id: 2,
    name: 'Emma',
    email: 'emma@email.com',
    password: 'password2'
  }
]

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).send([user, 'Cannot log in', info]);
    }

    req.login(user, err => {
      res.send('Logged in');
    });
  })(req, res, next);
})

app.get('/api/logout', function(req, res) {
  req.logout();

  console.log('logged out')

  return res.send();
});

app.get('/api/user', authMiddleware, (req, res) => {
  let user = users.find(user => {
    return user.id === req.session.passport.user
  })

  console.log([user, req.session])

  res.send({ user: user })
})

app.get('/api/generatelinktoken', authMiddleware, (req, res) => {
  let userIndex = users.findIndex(user => {
    return user.id === req.session.passport.user
  })

  let linkToken = randomToken()

  users[userIndex].linkToken = linkToken

  console.log(linkToken)

  res.send({ linkToken: linkToken })
})

app.get('/api/creator/:token', (req, res) => {
  let token = req.params.token;

  let creator = users.find(user => {
    return user.linkToken === token
  })

  if (!creator) {
    return res.status(400).send([creator, 'No user found for token']);
  }

  console.log(creator)

  res.send({ creator: creator })
})

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

app.listen(3000, () => {
  console.log('Example app listening on port 3000')
})

function randomToken() {
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let length = randomInt(8, 4);
  return randomString(length, chars);
}

function randomString(length, chars) {
  var result = ''
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

function randomInt(min, range) {
  return Math.floor(Math.random() * range + min)
}


