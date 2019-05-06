const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const nodecipher = require('node-cipher');
const Store = require('data-store');
const data = new Store({
    path: __dirname + '/../data/git.json'
});

router.post('/upload', (req,res) => {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('File not uploaded');
    }
    console.log(Object.keys(req.files).length == 0)
    let uploadedFile = req.files.file

    var uploadPath = path.resolve(__dirname + '/../files/' + uploadedFile.name);

    uploadedFile.mv(uploadPath, (err) => {
        if(err) return res.status(500).send(err)


        encrypt(uploadPath,req.body.password,req,res);
        //res.send('File: ' + uploadedFile.name + ' uploaded')
    })
})

router.post('/download', (req,res) => {
    var filePath = path.resolve(__dirname + '/../files/' + req.body.fileName);
    
    decrypt(filePath,req.body.password,req,res);
})

router.get('/getFiles', (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(fs.readdirSync(path.resolve(__dirname + '/../files')));
})

function encrypt(file,password,req,res) {
    nodecipher.encryptSync({
        input: file,
        output: file + '.cast5',
        password:password
    }, (err,opts) => {
        if(err) failEncrypt(file,req,res);

        return cleanUpEncrypt(file,req,res)
    })
}

function decrypt(file,password,req,res) {
    nodecipher.decryptSync({
        output: file,
        input: file + '.cast5',
        password:password
    }, (err,opts) => {
        if(err) failDecrypt(file,req,res);

        
    })
}

function failEncrypt(file,req,res) {
    if(fs.existsSync(file + '.cast5')) fs.unlinkSync(file + '.cast5');
    if(fs.existsSync(file)) fs.unlinkSync(file);

    res.status(500).send('error');
}

function failDecrypt(file,req,res) {
    res.status(500).send('error');
}

function cleanUpEncrypt(file,req,res) {
    fs.unlinkSync(file);
    return res.redirect('http://ajh657.net/upload');
}

function cleanUpDecrypt(file,req,res) {
    fs.unlinkSync(file + '.cast5');
    res.status(200).download(file);
}

module.exports = router;