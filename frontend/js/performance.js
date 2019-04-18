var opts = {
    angle: 0, // The span of the gauge arc
    lineWidth: 15, // The line thickness
    radiusScale: 100, // Relative radius
    pointer: {
      length: 0.5, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    //colorStart: '#6FADCF',   // Colors
    //colorStop: '#8FC0DA',    // just experiment with them
    percentColors: [[0.0, "#00ff00" ], [0.80, "#ffff00"], [1.0, "#ff0000"]],
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    
};
var target = document.getElementById('cpuMeter'); // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!

//percentColors = [[0.0, "#00ff00" ], [0.80, "#ffff00"], [1.0, "#ff0000"]];

gauge.maxValue = 100; // set max gauge value
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 1; // set animation speed (32 is default value)