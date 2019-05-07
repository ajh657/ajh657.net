function getFiles() {
    var dropdown = document.getElementById('file');
    var data = httpRequest('http://file.ajh657.net/getFiles');

    console.log(data);

    for(var i = 0; i < data.length; i++) {
        var opt = data[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

function httpRequest(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.send(null);
    
    console.log(request.responseText)
    return JSON.parse(request.responseText);
}