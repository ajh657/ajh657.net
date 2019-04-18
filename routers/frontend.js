const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req,res) => {
    var frontpagePath = path.resolve(__dirname + '/../frontend/html/index.html')

    console.log('Fontpage requested');
    console.log('Requester ip: ' + req.ip);
    console.log();

    res.sendFile(htmlPath);
})

router.get('/:file', (req,res) => {
    var htmlPath = path.resolve(__dirname + '/../frontend/html/' + req.params.file + ".html")

    console.log('Page: ' + req.params.file +' Requested');
    console.log('Requester ip: ' + req.ip);
    console.log();

    res.sendFile(htmlPath);
})

router.get('/js/:file', (req,res) => {
    var jsPath = path.resolve(__dirname + '/../frontend/js/' + req.params.file)

    console.log('File: ' + req.params.file +' Requested');
    console.log('Requester ip: ' + req.ip);
    console.log();

    res.sendFile(jsPath);
})

router.get('/css/:file', (req,res) => {
    var cssPath = path.resolve(__dirname + '/../frontend/css/' + req.params.file)

    console.log('File: ' + req.params.file +' Requested');
    console.log('Requester ip: ' + req.ip);
    console.log();

    res.sendFile(cssPath);
})

module.exports = router;