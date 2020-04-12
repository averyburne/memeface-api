const mongoose = require('mongoose')

const memeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  file: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Meme', memeSchema)
