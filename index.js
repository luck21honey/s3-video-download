var express = require('express');
var app = express();
var AWS = require('aws-sdk');

app.get('/', function (req, res, next) {
  res.send('API is workig...');
});


app.get('/s3-video-download/:fileName', function (req, res, next) {
  console.log('s3 video download api is working...');
  // download the file via aws s3 here
  var fileName = req.params.fileName;
  var AWSAccessKeyId = req.query['AWSAccessKeyId'];
  // var bucketUrl = 'https://testchris.s3.us-west.stackpathstorage.com'
  var bucketUrl = 'testchris.s3.us-west.stackpathstorage.com'

  // console.log('Trying to download file', fileName, AWSAccessKeyId, bucketUrl);
  AWS.config.update(
    {
      accessKeyId: AWSAccessKeyId,
      // secretAccessKey: "...",
      region: 'us-east-1'
    }
  );
  var s3 = new AWS.S3();
  var options = {
    Bucket: bucketUrl,
    Key: fileName,
  };

  res.attachment(fileName);
  var fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res);


  // res.send('s3 video download api called')
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('app listening at http://localhost:%s', port);
});