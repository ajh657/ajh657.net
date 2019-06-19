
var news


function init() {
  httpGetAsync('http://api.ajh657.net/wf/news', updateNews)
  setInterval(httpGetAsync('http://api.ajh657.net/wf/news', updateNews), 600000)
}

async function updateNews(data) {
  for (let i = 0; i < data.length; i++) {
    const element = array[i];
    createBox(element.message, element.message, element.id, "News")
  }
}

function httpGetAsync(theUrl, cFunction)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      cFunction(JSON.parse(xmlHttp.responseText));
    }
  }

  xmlHttp.open("GET", theUrl, true); // true for asynchronous 
  xmlHttp.send(null);
}

function createBox(Title ,text, id , rootID) {
  var box = document.createElement('div');
  box.className += "panel panel-default"
  box.id = id;

  var boxHeading = document.createElement('div');
  box.className += "panel-heading"
  box.id = id + "Heading";

  var boxContent = document.createElement('div');
  box.className += "panel-body"
  box.id = id + "Content";

  document.getElementById(rootID).appendChild(box);
  document.getElementById(box.id).appendChild(boxHeading);
  document.getElementById(box.id).appendChild(boxContent);
}