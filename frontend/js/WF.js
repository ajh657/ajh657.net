
var news


function init() {
  setInterval(httpGetAsync('http://api.ajh657.net/wf/news', updateNews), 600000);
  httpGetAsync('http://api.ajh657.net/wf', updateNews);
}

async function updateNews(data) {
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    createNewsBox(element.message, element.eta, element.id, "News")
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

function debug() {
  httpGetAsync('http://api.ajh657.net/wf', updateNews);
}

function printDebug(data) {
  console.log(JSON.parse(data))
}

function createNewsBox(Title ,text, id , rootID) {
  var box = document.createElement('div');
  box.className += "panel panel-default"
  box.id = id;

  var boxHeading = document.createElement('div');
  boxHeading.className += "panel-heading"
  boxHeading.id = id + "Heading";
  boxHeading.innerText = Title;

  var boxContent = document.createElement('div');
  boxContent.className += "panel-body"
  boxContent.id = id + "Content";
  boxContent.innerText = text;

  document.getElementById(rootID).appendChild(box);
  document.getElementById(id).appendChild(boxHeading);
  document.getElementById(id).appendChild(boxContent);
}