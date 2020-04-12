# Memeface API

## Front-end Repository
[Front-end Repository](https://github.com/averyburne/memeface-client)

## Deployed Site
[Deployed Website](https://whispering-citadel-04546.herokuapp.com/)

## ERD
[Planned ERD](https://imgur.com/gallery/nOzKMdA)

## Expected list of paths
- goes to /sign-up for signing up
- goes to /sign-in for signing in
- goes to /sign-out for signin out
- goes to /change-password for changing the users password
- goes to /memes to view memes
- goes to /memes/:id to view an individual meme
- goes to /memes to upload a meme
- goes to /memes/:id to delete a meme
- goes to /memes/:id to update a meme

## Dependencies
-"bcrypt": "^3.0.7"
- "cors": "^2.8.5"
- "dotenv": "^8.2.0"
- "express": "^4.17.1"
- "jsonwebtoken": "^8.5.1"
- "mongodb": "^3.4.0"
- "mongoose": "^5.8.1"
- "passport": "^0.4.1"
- "passport-http-bearer": "^1.0.1"

Dependencies for development
- "chai": "^4.2.0"
- "chai-http": "^4.3.0"
- "eslint": "^6.7.2"
- "mocha": "^6.2.2"
- "nodemon": "^2.0.2"
- "standard": "^14.3.1"
-
to install all dependencies run 'npm install'

## Scripts
- "start": "node server.js"
- "test": "mocha --exit"
- "server": "nodemon server.js"
- "serve": "nodemon server.js"
- "s": "nodemon server.js"
- "debug-server": "DEBUG=express:* nodemon server.js"

## Technologies Used
- Node.js
- ExpressJS
- AWS S3
- MongoDB
- Heroku

## How it works
The back-end is actually fairly simple it just takes in request from the front-end,
or from other development front-end tests(such as curl-scripts or Postman). It sends
the data to the specified route and then stores it in the MongoDB database on Heroku
before returning the data, which includes the title and the image url, to the front-end
to be displayed. The Version 2 back-end(not currently apart of the master branch)
takes the title and the file, uploads the file to AWS and the stores the url to that
in Heroku while returning it to the front-end to be displayed.

## Planning
The process started off as mostly rehashing old express code I had on a past project
since the first version only involved storing a title and a url, both as strings.
This worked fine on the front end since the API was able to return the url and then
could display it as an image via HTML img tag.

The next version was going to allow for storage of actual image files and not just
urls. It does this by storing the image file into my personal AWS S3 bucket and then
returning the url to AWS. Since I set the ACL value to public-read, this means that
the image will be viewable on a browser and not result in the default download of image.

The biggest issue I had with making the API had to do with the AWS credentials, the
errors I was getting kept referring to having incorrect credentials, but being unfamiliar
with S3 this caused me some confusion. The solution ended up being an import of my
account credentials (BUCKET_NAME, AWS Key, and secret key) into the s3upload file
from a hidden .env file.

## Unsolved Issues
This back-end repository worked perfectly fine for version 1, which just involved
uploading a title and a url to the Mongo database. It would return the url as string
making it easy for the front-end to display the images. Version 2 involved this API
uploading the image to AWS and then returning its amazon url to the front-end. It
does successfully do that, but not on the master branch currently since there is front-
end issues I would like to work on first. Version 3 would involved adding another field
to the Meme model for both comments and for likes allowing users to comment and like
on individual memes.
