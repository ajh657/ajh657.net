const express = require('express');
const os = require('os');
const cpuu = require('cputilization');

var sampler = cpuu({
  intercal: 200
});

console.log("test");

var router = express.Router();
var cpuUtilization = 0;

router.get('/', (req, res) => {
  res.send('Access Denied')
})

router.post('/stats', (req, res) => {
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

sampler.on('sample', function (sample) {
  cpuUtilization = sample.percentageBusy();
});