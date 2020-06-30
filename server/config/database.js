const MONGO_URI = 'mongodb://mongo:27017/plejdb'

module.exports = function(mongoose) {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(console.log('DB connected'))
    .catch(err => console.log(err))
}
