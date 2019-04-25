const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/:game', (req,res) => {
    var gamePath = path.resolve('../unity/' + req.params.game + '/index.html');

    if(fs.existsSync(gamePath)){
        res.sendFile(gamePath);
    }else{
        res.status(404).send('Not Found');
    }

});

router.get('/:game/TemplateData/:file', (req,res) => {
    var gamePath = path.resolve('../unity/' + req.params.game + '/TemplateData/' + req.params.file);

    if(fs.existsSync(gamePath)){
        res.sendFile(gamePath);
    }else{
        res.status(404).send('Not Found');
    }

});

router.get('/:game/TemplateData/:file', (req,res) => {
    var gamePath = path.resolve('../unity/' + req.params.game + '/TemplateData/' + req.params.file);

    if(fs.existsSync(gamePath)){
        res.sendFile(gamePath);
    }else{
        res.status(404).send('Not Found');
    }

});

module.exports = router;