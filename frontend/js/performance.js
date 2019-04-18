var radialOBJCPU = radialIndicator('#cpu', {
    barColor : '#87CEEB',
    barWidth : 10,
    initValue : 1,
    maxValue : 100,
    precentage : true,
    roundCorner : true
});

setInterval(function () {
    $.get('http://api.ajh657.net/stats').done(function (data) {
        var parsedData = JSON.parse(data);
        radialOBJCPU.animate(parsedData.cpu[0]);
    });
})