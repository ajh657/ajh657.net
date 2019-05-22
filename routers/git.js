const express = require('express');
const git = require('simple-git');
const Store = require('data-store');
const data = new Store({
    path: __dirname + '/../data/git.json'
});

var router = express.Router();

router.get('/', (req, res) => {
    res.send('Access Denied')
})

router.post('/', (req, res) => {
    data.set(req.body.repository.name, JSON.stringify(req.body));
    gitHandler(req.body);
    console.log(req.body.repository.name);
    console.log();
    res.status(202).send('Logged');
});

module.exports = router;

function gitHandler(body) {
    if (body.hook != null) {
        gitInit(body);
    }
    if (body.commits[0] != null) {
        if (body.repository.name == "ajh657.net") {
            console.log('Server Pulled')
            gitPullServer();
        }else{
            console.log('App pulled')
            gitPullApp();
        }
    }
}

function gitInit(body) {
    git().clone(body.repository.git_url,__dirname + '/../../apps/' + body.repository.name);
    console.log('New repo cloned');
}

function gitPullServer() {
    git(__dirname + '/..').pull();
}

function gitPullApp() {
    git(__dirname + '/..').pull();
}