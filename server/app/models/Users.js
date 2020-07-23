const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const ThirdPartyProviderSchema = new mongoose.Schema(
  {
    provider_name: {
      type: String,
      default: null
    },
    provider_id: {
      type: String,
      default: null
    },
    provider_data: {
      type: {},
      default: null
    }
  })

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
    third_party_auth: [ThirdPartyProviderSchema],
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

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.generateToken = function () {
  return randomToken()
}

UserSchema.methods.publicData = function () {
  let publicUser = this
  publicUser.email = ''
  publicUser.password = ''
  publicUser.third_party_auth = []
  publicUser.donations = []
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
