require('dotenv').config()

// Load the SDK and UUID
const AWS = require('aws-sdk')
const mime = require('mime-types')
const fs = require('fs')
const path = require('path')

const bucketName = 'averyburnesei'

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
})

// Create S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01'})

const s3Upload = function (file, mimetype) {
  // call S3 to retrieve upload file to specified bucket
  const uploadParams = {
    Bucket: bucketName, // bucket the file wil be saved to
    Key: '', // the name of the file when we upload it
    Body: '', // the file itself
    ACL: 'public-read', // makes the file readable
    ContentType: '' // allow file to be viewable instead of download by default
  }

  // Configure the file stream and obtain the upload parameters
  const fileStream = fs.createReadStream(file)

  fileStream.on('error', function (err) {
    console.log('File Error', err)
  })

  // the file we want to upload in a stream format
  uploadParams.Body = fileStream

  // name of the file
  uploadParams.Key = path.basename(file)
  // get the mimetype from the file
  uploadParams.ContentType = mimetype || mime.lookup(file)

  // call S3 to retrieve upload file to specified bucket
  return s3.upload(uploadParams).promise()
}

module.exports = s3Upload
