const express = require('express');
const os = require('os');

var router = express.Router();
var startMeasure = cpuAverage();

router.get('/', (req, res) => {
  res.send('Access Denied')
})

router.post('/stats', (req,res) => {
    var stats = {
        "cpu": os.loadavg()[0],
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