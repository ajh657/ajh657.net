
var news


function init() {
  httpGetAsync('http://api.ajh657.net/wf/news', updateNews)
  setInterval(httpGetAsync('http://api.ajh657.net/wf/news', updateNews), 600000)
}

async function updateNews(data) {
  console.log(data)
}

function httpGetAsync(theUrl, cFunction)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      cFunction(xmlHttp.responseText);
    }
  }

  xmlHttp.open("GET", theUrl, true); // true for asynchronous 
  xmlHttp.send(null);
}