let MONGO_URI = 'mongodb://localhost:27017/plejdb'

//if (process.env.NODE_ENV === 'production') MONGO_URI = 'mongodb://mongo:27017/plejdb'

if (process.env.NODE_ENV === 'production')
  MONGO_URI = 'mongodb+srv://root:ungaunga97@plejcluster.4skky.mongodb.net/plejdb?retryWrites=true&w=majority'

module.exports = function (mongoose, logger) {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(logger.info('DB connected' + MONGO_URI))
    .catch(err => logger.error(err))
}
