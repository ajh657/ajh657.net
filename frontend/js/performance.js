var radialOBJCPU = $('#cpu').radialIndicator('#cpu', {
    barColor : '#87CEEB',
    barWidth : 10,
    initValue : 1,
    maxValue : 100,
    precentage : true,
    roundCorner : true
});

setInterval(function () {
    $.get('').done(function (data) {
        var parsedData = JSON.stringify(data);
        radialOBJCPU.animate(parsedData.cpu);
    });
})