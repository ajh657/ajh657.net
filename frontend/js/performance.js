var radialOBJCPU = radialIndicator('#cpu', {
    barColor : '#87CEEB',
    barWidth : 10,
    initValue : 1,
    maxValue : 100,
    precentage : true,
    roundCorner : true
});

setInterval(100, function () {
    radialOBJCPU.animate(JSON.parse(httpGet('api.ajh657.net/stats')).cpu[0]);
})

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}