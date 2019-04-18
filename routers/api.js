const express = require('express');
const os = require('os');

var router = express.Router();

router.get('/', (req, res) => {
  res.send('Access Denied')
})

router.post('/stats', (req,res) => {
    var stats = {
        cpu: os.loadavg,
        patform: os.platform,
        uptime: os.uptime,
        ramTotal: os.ramTotal,
        ramFree: os.freemem
    }
    res.send(JSON.stringify(stats));
});

module.exports = router;