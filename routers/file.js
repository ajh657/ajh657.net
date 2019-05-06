const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/upload', (req,res) => {
    if (req.files == null) {
        return res.status(400).send('File not uploaded');
    }
    console.log(req.files == null)
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('File not uploaded');
    }
    console.log(Object.keys(req.files).length == 0)
    let uploadedFile = req.files.file

    uploadedFile.mv(__dirname + '../files/' + uploadedFile.name, (err) => {
        if(err) return res.status(500).send(err)

        res.send('File: ' + uploadedFile.name + ' uploaded')
    })
})

module.exports = router;