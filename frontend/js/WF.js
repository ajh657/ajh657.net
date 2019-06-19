
function init() {
    updateNews();
}

async function updateNews () {

  var data = request("news");

  while (data == undefined) {}

  var news = JSON.parse(data)
  console.log(news)

}

function request(type) {
    const Http = new XMLHttpRequest();
    const url='http://api.ajh657.net/wf/' + type;
    Http.open("GET", url, false);
    Http.send();

    Http.onreadystatechange = (e) => {
      if (this.readyState == 4) {
        return Http.responseText;
      }
    }
}