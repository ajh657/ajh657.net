var radialOBJCPU = radialIndicator('#cpu', {
    barColor : '#87CEEB',
    barWidth : 10,
    initValue : 1,
    maxValue : 100,
    precentage : true,
    roundCorner : true
});

setInterval(function () {
    var httpdata = httpGet('http://api.ajh657.net/stats');
    console.log(httpdata);
    var parsedData = JSON.parse(httpdata);

    radialOBJCPU.animate(Math.round(parsedData.cpu[0] * 100));
}, 100)

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "post", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}