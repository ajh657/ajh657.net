const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/:game', (req,res) => {
    var gamePath = path.resolve(__dirname + '/../unity/' + req.params.game + '/index.html');

    if(fs.existsSync(gamePath)){
        res.sendFile(gamePath);
    }else{
        res.status(404).send('Not Found');
    }

});

router.get('/:game/TemplateData/:file', (req,res) => {
    var gamePath = path.resolve(__dirname + '/../unity/' + req.params.game + '/TemplateData/' + req.params.file);

    if(fs.existsSync(gamePath)){
        if (path.extname(req.params.file)) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader("Access-Control-Allow-Origin", "*");
        }
        res.sendFile(gamePath);
    }else{
        res.status(404).send('Not Found');
    }

});

router.get('/:game/Build/:file', (req,res) => {
    var gamePath = path.resolve(__dirname + '/../unity/' + req.params.game + '/Build/' + req.params.file);

    if(fs.existsSync(gamePath)){
        if (path.extname(req.params.file)) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader("Access-Control-Allow-Origin", "*");
        }
        res.sendFile(gamePath);
    }else{
        res.status(404).send('Not Found');
    }

});

module.exports = router;