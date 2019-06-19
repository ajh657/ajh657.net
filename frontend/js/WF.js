import { url } from "inspector";

function init() {
    updateNews();
}

function updateNews () {

  data = request("news");

  console.log(data);

  var news = JSON.parse(data)
  console.log(news)

}

function request(url) {
  fetch(url).then(function(data) {
    return data;
  }).catch(function(error) {
    console.log(error)
  })
}