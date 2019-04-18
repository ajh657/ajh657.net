const express = require('express');
const git = require('simple-git');
const Store = require('data-store')
const data = new Store({ path: __dirname + '/data/git.json'});

var router = express.Router();

router.get('/', (req, res) => {
  res.send('Access Denied')
})

router.post('/', (req,res) => {
    data.set('test', JSON.stringify(req.body));
    console.log(data.get('test'));
    res.status(202).send('Logged');
});

module.exports = router;