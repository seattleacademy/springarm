var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();

const makePwmDriver = require('adafruit-i2c-pwm-driver')
const pwmDriver = makePwmDriver({ address: 0x40, device: '/dev/i2c-1' })
pwmDriver.setPWMFreq(50)

port = 6001;
var sensors = {};
counter = 0;
sensors.counter = counter;
//app.use(express.static(__dirname + '/public'));
app.use(express.static('..'));

var server = http.createServer(app);
server.listen(port);
console.log('listening on port', port)

app.all('/all', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(sensors));
});

app.all('/counter', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    sensors.counter++;
    res.send(sensors.counter.toString());
});

app.get('/channel/:channel/on/:on/off/:off/freq/:freq', function(req, res) {
    channel = req.params.channel || 0;
    on = req.params.on || 0;
    off = req.params.off || 0;
    freq = req.params.freq || 50;
    console.log(channel, on, off, freq);
    // pwmDriver.setPWMFreq(freq);
    // pwmDriver.setPWM(channel, on, off); // channel, on , off
    res.send(req.params);
})

var wss = new WebSocketServer({ server: server });
wss.on('connection', function(ws) {
    console.log('connection to client');
    ws.send(JSON.stringify({data:"myMessage"}));
    ws.on('message', function incoming(data) {
        console.log(data);
    });
    ws.on('close', function() {
        console.log('closing client');
    });
});