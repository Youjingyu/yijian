var http = require('http');
var express = require('express');
var app = express();
app.use("/", express.static(__dirname + '/'));

// 创建服务端
http.createServer(app).listen('8090', function() {
    console.log('启动服务器完成');
});