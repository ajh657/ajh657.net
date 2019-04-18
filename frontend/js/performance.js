//Intialiazation 
var cpuRadialObj = radialIndicator('#cpuRadialObj', {
    barColor: {
        0: '#00ff00',
        50: '#ffff00',
        90: '#ff0000'
    },
    barWidth : 10,
    initValue : 0
}); 
 
//Using Instance
cpuRadialObj.animate(60); 