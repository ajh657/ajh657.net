const express = require('express');
const os = require('os');
const cpuu = require('cputilization');
const https = require('https');

var sampler = cpuu({
  intercal: 200
});

var warframe;

updateWFData();
setInterval(function(){ updateWFData(); }, 120000);

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

router.post('/wf', (req,res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(warframe);
});

router.post('/wf/news', (req,res) => {

  if (warframe.news != undefined) {
    var news = [warframe.news[warframe.news.length - 4], warframe.news[warframe.news.length - 5], warframe.news[warframe.news.length - 6]];

    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(news);
  } else{
    res.status(500).send('Internal server error')
  }
});

module.exports = router;

sampler.on('sample', function (sample) {
  cpuUtilization = sample.percentageBusy();
});

function updateWFData() {
  https.get('https://api.warframestat.us/pc', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log('server updated')
        warframe = JSON.parse(data);
    });

  }).on('error', (err) => {
    console.log('Error: ' + err.message);
  });
}