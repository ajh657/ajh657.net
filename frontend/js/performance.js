$('#cpu').radialIndicator('#cpu', {
    barColor : '#87CEEB',
    barWidth : 10,
    initValue : 40,
    maxValue : 100,
    precentage : true,
    roundCorner : true
}); 

var radialObj = radialIndicator('#cpu', {
    barColor : '#87CEEB',
    barWidth : 10,
    initValue : 40
}); 
 
//Using Instance
radialObj.animate(1); 