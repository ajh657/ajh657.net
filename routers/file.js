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

        var test = encrypt(uploadPath,req.body.password,req,res);

        console.log(test);

        if (encrypt(uploadPath,req.body.password,req,res)) {
            fs.unlinkSync(uploadPath);
            res.send('File: ' + uploadedFile.name + ' uploaded');
        } else {
            res.send('error')
        }
        //res.send('File: ' + uploadedFile.name + ' uploaded')
    })
})

router.post('/download', (req,res) => {
    var filePath = path.resolve(__dirname + '/../files/' + req.body.file);
    console.log(filePath);
    console.log(filePath.slice(0, filePath.length-6));
    if (decrypt(filePath.slice(0, filePath.length-6),req.body.password,req,res)) {
        res.download(filePath.slice(0, filePath.length-6), (err) => {
            fs.unlinkSync(filePath.slice(0, filePath.length-6));
            res.send('ok');
        });
    } else{
        res.status(500).send('error')
    }
})

router.get('/getFiles', (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(fs.readdirSync(path.resolve(__dirname + '/../files')));
})

function encrypt(file,password,req,res) {
    console.log('here 1')
    try {
        nodecipher.encryptSync({
            input: file,
            output: file + '.cast5',
            password:password
        });
    } catch (e) {
        console.log(e)
        return false;
    }
    console.log('here 2')
    return true;
}

function decrypt(file,password,req,res) {
    try {
        nodecipher.decryptSync({
            output: file,
            input: file + '.cast5',
            password:password
        })
    } catch (e) {
        console.log(e)
        return false;
    }
    return true;
}

function failEncrypt(file,err) {
    if(fs.existsSync(file + '.cast5')) fs.unlinkSync(file + '.cast5');
    if(fs.existsSync(file)) fs.unlinkSync(file);
    console.log(err)
    return false;
}

module.exports = router;