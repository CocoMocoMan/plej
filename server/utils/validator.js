const validate = require('validate.js')

module.exports = {
  validEmail: validEmail,
  validURL: validURL,
  validPassword: validPassword
}

function validEmail(email) {
  const constraints = {
    email: {
      presence: true,
      email: true
    }
  }
  const notValid = validate({ email: email }, constraints)
  return !notValid
}

function validURL(url) {
  const constraints = {
    url: {
      presence: true,
      url: true
    }
  }
  const notValid = validate({ url: url }, constraints)
  return !notValid
}

function validPassword(password) {
  if (password.length < 8 || password.length > 16) return false
  let containsCapital = false
  let containsNumber = false
  for (let c of password) {
    if (c.charCodeAt() >= 65 && c.charCodeAt() <= 90) containsCapital = true
    if (c.charCodeAt() >= 48 && c.charCodeAt() <= 57) containsNumber = true
  }
  return containsCapital && containsNumber
}