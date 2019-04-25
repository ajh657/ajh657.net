const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/:game', (req,res) => {
    var gamePath = path.resolve('/unity/' + req.params.game + '/index.html');

    console.log(gamePath);
    console.log(fs.existsSync(gamePath));
    console.log();

    if(fs.existsSync(gamePath)){
        res.sendFile(gamePath);
    }else{
        res.status(404).send('Not Found');
    }

});

router.get('/:game/TemplateData/:file', (req,res) => {
    var gamePath = path.resolve('/unity/' + req.params.game + '/TemplateData/' + req.params.file);

    console.log(gamePath);
    console.log();

    if(fs.existsSync(gamePath)){
        res.sendFile(gamePath);
    }else{
        res.status(404).send('Not Found');
    }

});

router.get('/:game/TemplateData/:file', (req,res) => {
    var gamePath = path.resolve('/unity/' + req.params.game + '/TemplateData/' + req.params.file);

    console.log(gamePath);
    console.log();

    if(fs.existsSync(gamePath)){
        res.sendFile(gamePath);
    }else{
        res.status(404).send('Not Found');
    }

});

module.exports = router;