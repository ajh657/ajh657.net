function permission() {
    Notification.requestPermission();
}

function send() {
    var notificationToSend = new Notification('test');
    notificationToSend.send();
}