const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// set up multer for file upload
const multer = require('multer')

// pull in Mongoose model for memes
const Comment = require('../models/comment')

// this is a collection of methods that help detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { meme: { title: '', text: 'foo' } } -> { meme: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /memes
router.get('/comments', requireToken, (req, res, next) => {
  Comment.find()
    .then(comments => {
      // `memes` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return comments.map(comment => comment.toObject())
    })
    // respond with status 200 and JSON of the memes
    .then(comments => res.status(200).json({ comments: comments }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
router.get('/comments/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Comment.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "memes" JSON
    .then(comment => res.status(200).json({ comment: comment.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /memes
router.post('/comments', requireToken, removeBlanks, (req, res, next) => {
  // set owner of new comment to be current user
  // req.body.example.owner = req.user.id
  console.log(req.body)
  Comment.create(req.body)
    // respond to succesful `create` with status 201 and JSON of new "comment"
    .then(comment => {
      res.status(201).json({ comment: comment.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /memes/5a7db6c74d55bc51bdf39793
router.patch('/comments/:id', requireToken, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.example.owner

  Comment.findById(req.params.id)
    .then(handle404)
    .then(comment => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, comment)

      // pass the result of Mongoose's `.update` to the next `.then`
      return comment.updateOne(req.body.comment)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /memes/5a7db6c74d55bc51bdf39793
router.delete('/comments/:id', requireToken, (req, res, next) => {
  Comment.findById(req.params.id)
    .then(handle404)
    .then(comment => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, comment)
      // delete the example ONLY IF the above didn't throw
      comment.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
