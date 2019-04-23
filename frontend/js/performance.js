var radialOBJCPU = radialIndicator('#cpu', {
    barColor : '#87CEEB',
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
    var cpu = parsedData.cpu;
    var cpu = cpu * 10;
    var cpu = cpu.toFixed(2);

    radialOBJCPU.animate(cpu);
    console.log(cpu);
}, 800)

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "post", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}