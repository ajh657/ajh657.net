const express = require('express');
const git = require('simple-git');
const Store = require('data-store')
const data = new Store({ path: './../data/git.json'});

var router = express.Router();

router.get('/', (req, res) => {
  res.send('Access Denied')
})

router.post('/', (req,res) => {
    data.Store('test', JSON.stringify(req.body))
    res.status(202).send('Logged');
});

module.exports = router;