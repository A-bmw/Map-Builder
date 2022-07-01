/*****************************************************
 * 
 * 
 * http://localhost:3000/create-map/{"mapTileWidth":30,"mapTileHeight":30,"numRooms":30}
 * 
 * 
*******************************************************/

var express = require('express')
var app = require('express')();
var http = require('http').Server(app);
var Map = require('./public/js/map.class.js');
var Utils = require('./public/js/utils.class.js');
var seedrandom = require('./public/lib/seedrandom.min.js');
//var fs = require('fs');
//eval(fs.readFileSync('./lib/seedrandom.min.js')+'');

var options = {logging:true}

var port = 3000;

app.use(express.static('public'));

app.get('/create-map/:options',function(req,res){
  
  var utils = new Utils();

  var options = JSON.parse(req.params.options);
  
  var map = new Map(options);
  
  map.init();

  map.addRandomRooms(options.numRooms);

  res.end(map.toString());
  //res.end("hi");
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});



