function getFiles() {
    var dropdown = document.getElementById('file');
    var data = httpRequest('http://file.ajh657.net/getFiles');

    for(var i = 0; i < data.length; i++) {
        var opt = data[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

function httpRequest(url) {
    const Http = new XMLHttpRequest();
    Http.open("POST", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        console.log(Http.responseText)
        return JSON.parse(Http.responseText)
    }
}