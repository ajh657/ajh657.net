const express = require('express');
const os = require('os');
const cpuu = require('cputilization');
const https = require('https');

var sampler = cpuu({
  intercal: 200
});

var warframe;

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

  var news;
  news[0] = warframe.news[(warframe.news.length - 1) - 3]
  news[1] = warframe.news[(warframe.news.length - 1) - 4]
  news[2] = warframe.news[(warframe.news.length - 1) - 5]

  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(news);
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
        warframe = JSON.parse(data);
    });

  }).on('error', (err) => {
    console.log('Error: ' + err.message);
  });
}