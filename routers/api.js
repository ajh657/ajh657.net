const express = require('express');
const os = require('os');
var cpuu = require('cputilization');


var router = express.Router();
var cpuUtilization = 0;

router.get('/', (req, res) => {
  res.send('Access Denied')
})

router.post('/stats', (req,res) => {
    var stats = {
        "cpu": cpuUtilization,
        "patform": os.platform(),
        "uptime": os.uptime(),
        "ramTotal": os.totalmem(),
        "ramFree": os.freemem()
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(stats);
});

module.exports = router;

cpuu({timeout: 500}, function(error, sample) {
  cpuUtilization = sample.percentageBusy();
});