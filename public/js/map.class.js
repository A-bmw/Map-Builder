/**************************************************************************
var options = {'mapTileWidth':10,'mapTileHeight':50};
var map = new Map(options);
var map.init();

************************************************************************/
if(typeof module !== "undefined")  var Utils = require('./utils.class.js');
if(typeof module !== "undefined")  var Graph = require('../lib/graph.js');
if(typeof module !== "undefined")  var astar = require('../lib/astar.js');


function Map(options)
{
  this.options = options;
  this.canvasID = options.canvasID;
  this.debug = true;
  
  this.mapObjs = [];
  this.rooms = [];
  
  this._WALL = 2;
  this._BLANK = 1;
  this._ROAD = 3;

  this.utils = new Utils();
  
  this.init = function()
  {
    if(this.debug) console.log("Initializing Map");

    this.resetMap();
  }
  
  this.resetMap = function()
  {
    if(this.debug) console.log("Clearing Map");

    this.rooms = [];
    this.mapObjs = new Array(this.options.mapTileWidth);
    
    for(var i=0;i<this.options.mapTileWidth;i++)
    {
        this.mapObjs[i] = new Array(this.options.mapTileHeight);
      
        for(var j=0;j<this.options.mapTileHeight;j++)
        {
          this.mapObjs[i][j] = this._WALL;
        }
    }
  }
  
  this.findPath = function(startX, startY, endX, endY)
  {
    if(this.debug) console.log("find path from " + startX + "," + startY + " to " + endX + "," + endY);

    var graph = new Graph(this.mapObjs);
    
    var start = graph.grid[startX][startY];
    
    var end = graph.grid[endX][endY];
    
    var path = astar.search(graph, start, end);

    return path;
  }
  
  this.fillPath = function(path, tileType)
  {
    for(var i=0;i<path.length;i++)
    {
      this.mapObjs[path[i].x][path[i].y] = tileType;
    }
  }
  
  
  this.addRandomRooms = function(numRooms)
  {
    if(this.debug) console.log("***Adding " + numRooms + " random rooms***");
    
    var numRoomsCreated =0;
    var attempts = 0;
    
    while(numRoomsCreated < numRooms && attempts < numRooms*2)
    {
   
      var roomSize = this.utils.randomBetween(5, 10);
      var x = this.utils.randomBetween(1,this.options.mapTileWidth-roomSize-1);
      var y = this.utils.randomBetween(1,this.options.mapTileHeight-roomSize-1);
      
      if(this.debug) console.log("...searching " + x + "," + y + " size:" + roomSize);
      
      if(this.isEmpty(x,y,roomSize,2))
      {
        if(this.debug) console.log("...area is empty, adding");
        this.addRoom(x, y, roomSize);
        numRoomsCreated++;
      }
      else
      {
        if(this.debug) console.log("...area is NOT empty, trying again");
      }
      
      attempts++;
    }
    
    if(this.debug) console.log("***done adding rooms***");
  }
  
  this.isEmpty = function(startX,startY,size, buffer)
  {

    for(y=startY-buffer;y<startY+size+buffer;y++)
    {
        for(x=startX-buffer;x<startX+size+buffer;x++)
        {
          if(x > 0 && x < this.options.mapTileWidth && y>0 && y < this.options.mapTileHeight)
          {
            if(this.mapObjs[x][y] == this._BLANK) return false;
          }
        }
    }
    
    
    return true;
  }
  
  this.addRoom = function(x, y, roomSize)
  {
    if(this.debug) console.log("***Adding room at " + x + "," + " Size:" + roomSize);

    var maxX = x + roomSize;
    var maxY = y + roomSize;
    
    for(var drawX = x;drawX < maxX;drawX++)
    {
      for(var drawY = y;drawY <maxY;drawY++)
      {
        this.mapObjs[drawX][drawY] = this._BLANK;      
      }
    }
    
    this.rooms.push({x:x,y:y,roomSize:roomSize});
    
    if(this.rooms.length > 1)
    {
      var startRoomIdx = this.rooms.length-2;
      var endRoomIdx = this.rooms.length-1;
      var startX = Math.floor(this.rooms[startRoomIdx].x+(this.rooms[startRoomIdx].roomSize)/2);
      var startY = Math.floor(this.rooms[startRoomIdx].y+(this.rooms[startRoomIdx].roomSize)/2);
      var endX = Math.floor(this.rooms[endRoomIdx].x+(this.rooms[endRoomIdx].roomSize)/2);
      var endY = Math.floor(this.rooms[endRoomIdx].y+(this.rooms[endRoomIdx].roomSize)/2);
      
      var path = this.findPath(startX, startY, endX, endY);
      this.fillPath(path, this._BLANK);
      if(this.debug) 
      {
        console.log("...connecting room " + startX + "," + startY + " to " + endX + "," + endY);
      }
      
      
    }

  }

  this.toString = function()
  {
    var out = "";
    
    //
    //due to how we are laying this out, have to do y-axis first
    //
    for(var y=0;y<this.options.mapTileHeight;y++)
    {
        for(var x=0;x<this.options.mapTileWidth;x++)
        {
          out+=this.mapObjs[x][y]-1;
        }
       out+="\r\n";
    }  
    
    return out;
  }

  
  this.toHTML = function()
  {
    var out = "";
    
    //
    //due to how we are laying this out, have to do y-axis first
    //
    for(var y=0;y<this.options.mapTileHeight;y++)
    {
        for(var x=0;x<this.options.mapTileWidth;x++)
        {
                    
          if(this.mapObjs[x][y] != this._BLANK)
          {
            out+=this.mapObjs[x][y];
          }
          else
          {
            out+="&nbsp;";
          }
          
        }
       out+="<br>";
    }  
    
    return out;
  }
}


if(typeof module !== "undefined")  module.exports = Map;