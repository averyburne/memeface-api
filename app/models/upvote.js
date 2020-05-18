const mongoose = require('mongoose')

const upvoteSchema = new mongoose.Schema({
  upvote: {
    type: Boolean,
    required: false
  },
  downvote: {
    type: Boolean,
    required: false
  },
  meme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meme',
    required: true
  },
  ownerEmail: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Upvote', upvoteSchema)
