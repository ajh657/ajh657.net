const express = require('express');
const router = express.Router();
const Store = require('data-store');
const fs = require('fs');
const fileList = require('../data/fileList.json');

const data = new Store({ path: __dirname + '/../data/visits.json'});
const bans = new Store({ path: __dirname + '/../data/bans.json'});
const path = require('path');

router.get('/', (req,res) => {

    if(ifAllowed(req.ip)) {

        console.log('Banned ip reguested frontpage');
        console.log('Requester ip: ' + req.ip);
        console.log(new Date().toLocaleString());
        console.log();

        res.status(403).send('Forbidden');
    }
    else {
        var frontpagePath = path.resolve(__dirname + '/../frontend/html/index.html')

        console.log('Fontpage requested');
        console.log('Requester ip: ' + req.ip);
        console.log(new Date().toLocaleString());
        console.log();

        data.set('visits', data.get('visits') + 1)

        res.sendFile(frontpagePath);
    }
})

router.get('/robots.txt', (req,res) => {
    var robotsPath = path.resolve(__dirname + '/../frontend/robots.txt')

    console.log('Robots.txt requested');
    console.log('Requester ip: ' + req.ip);
    console.log(new Date().toLocaleString());
    console.log();

    res.sendFile(robotsPath);
})

router.get('/:file', (req,res) => {

    var file = req.params.file;

    if(ifAllowed(req.ip)) {

        console.log('Banned ip reguested file: ' + file);
        console.log('Requester ip: ' + req.ip);
        console.log(new Date().toLocaleString());
        console.log();

        res.status(403).send('Forbidden');
    }
    else {
        
        if(file.charAt(0) == ".") {
            ban(req.ip, res)
        }
        else {
            var htmlPath = path.resolve(__dirname + '/../frontend/html/' + file + ".html")

            console.log('Page: ' + req.params.file +' Requested');
            console.log('Requester ip: ' + req.ip);
            console.log(new Date().toLocaleString());
            console.log();

    

            if(!fs.existsSync(htmlPath)) {
                res.status(404).send('File not found')
            } 
            else {
                data.set('visits', data.get('visits') + 1);
                res.sendFile(htmlPath);
            }
        }
    }
})

router.get('/js/:file', (req,res) => {
    var jsPath = path.resolve(__dirname + '/../frontend/js/' + req.params.file)

    console.log('File: ' + req.params.file +' Requested');
    console.log('Requester ip: ' + req.ip);
    console.log(new Date().toLocaleString());
    console.log();

    if(!fs.existsSync(jsPath)) {
        res.status(404).send('File not found');
    }
    else {
        res.sendFile(jsPath);
    }
})

router.get('/css/:file', (req,res) => {
    var cssPath = path.resolve(__dirname + '/../frontend/css/' + req.params.file)

    console.log('File: ' + req.params.file +' Requested');
    console.log('Requester ip: ' + req.ip);
    console.log(new Date().toLocaleString());
    console.log();

    if(!fs.existsSync(cssPath)) {
        res.status(404).send('File not found');
    }
    else {
        res.sendFile(cssPath);
    }
})

module.exports = router;

function bannableFile(file) {
    var nono = false;
    for (let i = 0; i < fileList.list.length; i++) {
        var element = fileList.list[i];
        if(element == file) nono = true;
    }
    return nono;
}

function ban(ip,res) {
    var array = bans.get('bans');
    array[array.length] = ip;
    bans.set('bans', array);

    console.log(" IP banned: " + ip);
    res.status(403).send('Forbidden');
}

function ifAllowed(ip) {
    var banned = false;
    var bannedList = bans.get('bans');
    for (let index = 0; index < bannedList.length; index++) {
        var element = bannedList[index];
        
        if(element == ip) banned = true;
    }

    return banned;
}