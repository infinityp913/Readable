const express = require('express');
const app = express();



app.get('/', function(req, res){
    res.writeHead(200, {'ContentType':'text/html'});
    res.sendFile('main.html');
    res.end();
})