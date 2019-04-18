const express = require('express');
const os = require('os');

var router = express.Router();
var startMeasure = cpuAverage();

router.get('/', (req, res) => {
  res.send('Access Denied')
})

router.post('/stats', (req,res) => {
    var stats = {
        "cpu": LoadAvg(),
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

function LoadAvg() {
    //Grab second Measure
    
    var endMeasure = cpuAverage(); 

    //Calculate the difference in idle and total time between the measures
    var idleDifference = endMeasure.idle - startMeasure.idle;
    var totalDifference = endMeasure.total - startMeasure.total;

    //Calculate the average percentage CPU usage
    var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

    return percentageCPU;

}

function cpuAverage() {

    //Initialise sum of idle and time of cores and fetch CPU info
    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();
  
    //Loop through CPU cores
    for(var i = 0, len = cpus.length; i < len; i++) {
  
      //Select CPU core
      var cpu = cpus[i];
  
      //Total up the time in the cores tick
      for(type in cpu.times) {
        totalTick += cpu.times[type];
     }     
  
      //Total up the idle time of the core
      totalIdle += cpu.times.idle;
    }
  
    //Return the average Idle and Tick times
    return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}