const express = require('express');
const os = require('os');

var router = express.Router();

router.get('/', (req, res) => {
  res.send('Access Denied')
})

router.get('/stats', (req,res) => {
    var stats = {
        "cpu": os.loadavg(),
        "patform": os.platform(),
        "uptime": os.uptime(),
        "ramTotal": os.totalmem(),
        "ramFree": os.freemem()
    }
    console.log(stats);
    res.send(stats);
});

module.exports = router;