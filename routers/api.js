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

router.post('/wf/events', (req,res) => {
  if (warframe.events != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.events);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.post('/wf/sortie', (req,res) => {
  if (warframe.sortie != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.sortie);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.post('/wf/syndicateMissions', (req,res) => {
  if (warframe.syndicateMissions != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.syndicateMissions);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.post('/wf/fissures', (req,res) => {
  if (warframe.fissures != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.fissures);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.post('/wf/invasions', (req,res) => {
  if (warframe.invasions != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.invasions);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.post('/wf/baro', (req,res) => {
  if (warframe.voidTrader != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.voidTrader);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.post('/wf/darvo', (req,res) => {
  if (warframe.dailyDeals != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.dailyDeals);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.post('/wf/simaris', (req,res) => {
  if (warframe.simaris != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.simaris);
  } else {
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
        console.log('WF data updated')
        console.log();
        warframe = JSON.parse(data);
    });

  }).on('error', (err) => {
    console.log('Error: ' + err.message);
  });
}