    var host = window.document.location.host;
    console.log('host',host);

    //var ws = new WebSocket('ws://' + host);
    var ws = new WebSocket('ws://'+host);
        ws.onmessage = function(event) {
        console.log(JSON.parse(event.data));
        //console.log(JSON.parse(event.data));
    };
