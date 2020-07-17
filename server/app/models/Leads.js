const mongoose = require('mongoose')
const validator = require('../../utils/validator')

const LeadSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true
    },
    lName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String
    },
    resolved: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
)

LeadSchema.statics.addItem = function addItem(item, callback) {
  if (!validator.validEmail(item.email)) {
    callback({ message: 'Not a valid email' })
    return
  }
  (new this(item)).save(callback)
}

module.exports = Lead = mongoose.model('leads', LeadSchema)