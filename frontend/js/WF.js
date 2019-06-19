function init() {
    updateNews();
}

async function updateNews () {
  console.log(request("http://api.ajh657.net/wf/news"))
}

function request(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      return this.responseText;
    }
};
xhttp.open("GET", "filename", false);
xhttp.send();
}