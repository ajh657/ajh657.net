var cpuKnob = pureknob.createKnob(300, 300);

cpuKnob.setProperty('cpu', 0);
myKnob.setValue(70);
myKnob.setPeaks([100]);

var node = knob.node();
var elem = document.getElementById('cpuKnob');
elem.appendChild(node);