const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const stripeconfig = require('../../config/stripe.js')

const stripe = require('stripe')(stripeconfig.secretKey)

const DonationSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    from: {
      type: String,
      default: null
    },
    message: {
      type: String,
      default: null
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
)

const LinkSchema = new mongoose.Schema(
  {
    link_token: {
      type: String,
      index: true,
      unique: true,
      sparse: true
    },
    link_content: {
      type: String,
      default: null
    },
    donations: [DonationSchema],
    date: {
      type: Date,
      default: Date.now
    }
  })

const UserSchema = new mongoose.Schema(
  {
    google_id: {
      type: String,
      default: null
    },
    facebook_id: {
      type: String,
      default: null
    },
    twitter_id: {
      type: String,
      default: null
    },
    stripe_id: {
      type: String,
      default: null
    },
    name: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    email_is_verified: {
      type: Boolean,
      default: false
    },
    password: {
      type: String
    },
    alias: {
      type: String
    },
    links: [LinkSchema],
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
)

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.generateToken = function () {
  return randomToken()
}

UserSchema.methods.addStripeAccount = function () {
  stripe.accounts.create({
    type: 'express',
    email: this.email
  })
    .then(account => {
      this.stripe_id = account.id
      this.save()
    })
}

UserSchema.methods.publicData = function () {
  let publicUser = this
  publicUser.google_id = ''
  publicUser.facebook_id = ''
  publicUser.twitter_id = ''
  publicUser.stripe_id = ''
  publicUser.email = ''
  publicUser.password = ''
  publicUser.links = []
  publicUser.date = ''
  return publicUser
}

function randomToken() {
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let length = randomInt(8, 4)
  return randomString(length, chars)
}

function randomString(length, chars) {
  var result = ''
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

function randomInt(min, range) {
  return Math.floor(Math.random() * range + min)
}

module.exports = User = mongoose.model('users', UserSchema)
