/**var radialOBJCPU = radialIndicator('#cpu', {
    barColor : '#87CEEB',
    barWidth : 10,
    initValue : 1,
    minValue : 0,
    maxValue : 100,
    percentage : true,
    roundCorner : true
});

var radialOBJRAM = radialIndicator('#ram', {
    barColor : '#00ff00',
    barWidth : 10,
    initValue : 1,
    minValue : 0,
    maxValue : 100,
    percentage : true,
    roundCorner : true
});

setInterval(function () {
    var httpdata = httpGet('http://api.ajh657.net/stats');
    var parsedData = JSON.parse(httpdata);

    var ram = 100 - ((parsedData.ramFree / parsedData.ramTotal) * 100);
    var ram = ram.toFixed(2);

    var cpu = parsedData.cpu;
    var cpu = cpu * 100;
    var cpu = cpu.toFixed(2);

    radialOBJCPU.animate(ram);
    radialOBJCPU.animate(cpu);
}, 800)
*/

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "post", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function myYRangeFunction(range) {
    // TODO implement your calculation using range.min and range.max
    var min = 0;
    var max = 100;
    return {min: min, max: max};
  }

var cpuChart = new SmoothieChart({grid:{sharpLines:true},tooltip:true,maxValue:100, minValue:0}),
    cpuCanvas = document.getElementById('cpu-chart'),
    cpuSeries = new TimeSeries();

cpuChart.addTimeSeries(cpuSeries, {lineWidth:2,strokeStyle:'#0080ff',maxValue:100,minValue:0,});
cpuChart.streamTo(cpuCanvas, 1000);

var ramChart = new SmoothieChart({grid:{sharpLines:true},tooltip:true,maxValue:100, minValue:0}),
    ramCanvas = document.getElementById('ram-chart'),
    ramSeries = new TimeSeries();

ramChart.addTimeSeries(ramSeries, {lineWidth:2,strokeStyle:'#00ff00',maxValue:100,minValue:0,});
ramChart.streamTo(ramCanvas, 1000);

setInterval(function () {
    var httpdata = httpGet('http://api.ajh657.net/stats');
    var parsedData = JSON.parse(httpdata);

    var ram = parsedData.ramTotal / parsedData.ramFree;
    ram = ram * 100;
    ram = ram.toFixed(2);

    var cpu = parsedData.cpu;
    cpu = cpu * 100;
    cpu = cpu.toFixed(2);

    var cpuText = document.getElementById('cpuLoad');
    cpuText.textContent = "Cpu Load: " + cpu;

    cpuSeries.append(new Date().getTime(), cpu)

    var ramText = document.getElementById('ramLoad');
    ramText.textContent = "Ram Usage: " + ram;

    ramSeries.append(new Date().getTime(), ram)
}, 800)