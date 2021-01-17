const express = require('express');
const app = express();
var path = require('path');
app.use(express.static(__dirname ));
// const tesseract = require("tesseract-ocr");

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

// tesseract.recognize("image.jpg", config).then(text => {
//     console.log("Result:", text)
//   })
//   .catch(error => {
//     console.log(error.message)
//   });

app.get('/', function(req, res){
    res.sendFile(path.resolve('../index.html'));
})

app.post('/get_text', function(req, res){
    console.log(req.body);
});

app.listen(8080);