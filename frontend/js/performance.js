var cpuKnob = pureknob.createKnob(300, 300);

cpuKnob.setProperty('cpu', 0);
cpuKnob.setValue(70);
//cpuKnob.setPeaks([100]);

var node = cpuKnob.node();
var elem = document.getElementById('cpuKnob');
elem.appendChild(node);