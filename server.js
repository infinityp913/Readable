const express = require('express');
const app = express();
var path = require('path');
app.use(express.static(__dirname ));
const tesseract = require("node-tesseract-ocr");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.text();
app.use(jsonParser);
const fs = require('fs');
app.use(express.limit(1000000000));

//From github repo that converts data-uri to image
const ImageDataURI = require('image-data-uri');


const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

app.get('/', function(req, res){
    res.sendFile(path.resolve('../index.html'));
})

function dataURItoBlob(dataURI) {
  var byteStr;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteStr = atob(dataURI.split(',')[1]);
  else
      byteStr = unescape(dataURI.split(',')[1]);

  var mimeStr = dataURI.split(',')[0].split(':')[1].split(';')[0];

  var arr= new Uint8Array(byteStr.length);
  for (var i = 0; i < byteStr.length; i++) {
      arr[i] = byteStr.charCodeAt(i);
  }

  return new Blob([arr], {type:mimeStr});
}

//function to save datauri to filepath
function convertAndSave(dataURI, filepath){

}

app.post('/get_text', function(req, res){
    // convertAndSave(req.body, 'image.png');
    ImageDataURI.outputFile(req.body, 'image.png');
    // fs.writeFileSync('tmp/myfile.png', new Buffer(req.body, 'base64'));
    output = "";
    tesseract.recognize("image.png", config).then(text => {
      output = text;
      console.log(output.length);
      res.writeHead(200, {'ContentType':'text/plain'});
      res.write(output);
      res.end();

      console.log("Result:", text)
    })
    .catch(error => {
      console.log(error.message)
    });
    
});



app.listen(8080);