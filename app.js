var app = require('express').createServer()
var io = require('socket.io').listen(app);

app.listen('8081');

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

var spawn = require('child_process').spawn;
var tail = spawn('tail', ['-f', './log.out']);

tail.stdout.on('data', function (data) {
  io.sockets.emit('log', data.toString('utf8'));
});
