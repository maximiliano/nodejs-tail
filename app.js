var app = require('express').createServer()
var io = require('socket.io').listen(app);
var path = require('path');

app.listen('8081');

if (process.argv[2] != undefined){
   filename = process.argv[2];
   if (!path.existsSync(filename)){
      throw(filename + ' does not exists');
   }
}
else {
   filename = 'log.out'
}

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

var spawn = require('child_process').spawn;
var tail = spawn('tail', ['-f', filename]);

tail.stdout.on('data', function (data) {
  io.sockets.emit('log', data.toString('utf8'));
});
