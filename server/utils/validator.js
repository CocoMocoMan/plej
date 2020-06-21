const validate = require('validate.js')

module.exports = {
  validEmail: validEmail,
  validURL: validURL
}

function validEmail(email) {
  const constraints = {
    email: {
      presence: true,
      email: true
    }
  }
  const notValid = validate({email: email}, constraints)
  return !notValid
}

function validURL(url) {
  const constraints = {
    url: {
      presence: true,
      url: true
    }
  }
  const notValid = validate({url: url}, constraints)
  return !notValid
}