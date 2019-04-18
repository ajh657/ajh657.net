var cpuKnob = pureknob.createKnob(300, 300);

cpuKnob.setProperty(propertyName, value);
myKnob.setValue(70);
myKnob.setPeaks([100]);

var node = knob.node();
var elem = document.getElementById('cpuKnob');
elem.appendChild(node);