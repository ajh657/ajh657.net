var radialOBJCPU = radialIndicator('#cpu', {
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

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "post", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}