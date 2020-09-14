let url = 'http://localhost:8080'
if (process.env.NODE_ENV === 'production') {
  url = 'https://plej.link'
}

module.exports = url