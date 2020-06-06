var app = require("express")();
var io = require("socket.io")(8000);
var path = "";
var md5 = "";

app.get("/css/styles.css", function (req, res) {
  res.sendFile(__dirname + "/css/styles.css");
})
app.get("", function (req, res) {
  res.sendFile(__dirname + "/index.html");
})
app.get("/message.html", function (req, res) {
  res.sendFile(__dirname + "/message.html");
  md5 = req.query.md5;
})
app.listen((process.env.PORT || 80), function () {
  console.log("80. Port Dinleniliyor");
})

io.on('connection', function (socket) {
  const _id = socket.id
  console.log('Socket Connected: ' + _id)
  // Here we emit our custom event
  socket.on('disconnect', () => {
    io.emit('myCustomEvent', { customEvent: 'Kullanıcı ayrıldı..' })
    console.log('Socket disconnected: ' + _id)
  })
  socket.on(md5, function (msg) {
    io.emit(md5, msg);
  })
})