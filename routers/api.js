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

router.get('/wf', (req,res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(warframe);
});

router.get('/wf/news', (req,res) => {

  if (warframe.news != undefined) {
    var news = [warframe.news[warframe.news.length - 4], warframe.news[warframe.news.length - 5], warframe.news[warframe.news.length - 6]];

    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(news);
  } else{
    res.status(500).send('Internal server error')
  }
});

router.get('/wf/events', (req,res) => {
  if (warframe.events != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.events);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.get('/wf/sortie', (req,res) => {
  if (warframe.sortie != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.sortie);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.get('/wf/syndicateMissions', (req,res) => {
  if (warframe.syndicateMissions != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.syndicateMissions);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.get('/wf/fissures', (req,res) => {
  if (warframe.fissures != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.fissures);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.get('/wf/invasions', (req,res) => {
  if (warframe.invasions != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.invasions);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.get('/wf/baro', (req,res) => {
  if (warframe.voidTrader != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.voidTrader);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.get('/wf/darvo', (req,res) => {
  if (warframe.dailyDeals != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.dailyDeals);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.get('/wf/simaris', (req,res) => {
  if (warframe.simaris != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.simaris);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.get('/wf/arbitration', (req,res) => {
  if (warframe.arbitration != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.arbitration);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.get('/wf/vallisCycle', (req,res) => {
  if (warframe.vallisCycle != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.vallisCycle);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.get('/wf/nightwave', (req,res) => {
  if (warframe.nightwave != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.nightwave);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.get('/wf/kuva', (req,res) => {
  if (warframe.kuva != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.kuva);
  } else {
    res.status(500).send('Internal server error')
  }
});

router.get('/wf/arbitration', (req,res) => {
  if (warframe.arbitration != undefined) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(warframe.arbitration);
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