# Memeface API

## ERD
[Planned ERD](https://imgur.com/gallery/nOzKMdA)

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
