
function init() {
    updateNews();
}

async function updateNews () {
    var news = JSON.parse(request("news"))
    console.log(news)
}

function request(type) {
    const Http = new XMLHttpRequest();
    const url='https://api.ajh657.net/wf/' + type;
    Http.open("POST", url, false);
    Http.send();

    Http.onreadystatechange = (e) => {
      if (this.readyState == 4) {
        return Http.responseText;
      }
    }
}