# map-generator
A javascript and node-js microservice which generates a map for a rouge like game.

Only generates rooms and pathways between the rooms.

# index.html
Uses the traditional approach of included js files within an HTML file. 

Creates objects and calls functions to generate the map

-refreshDisplay()
refreshes the map element and displays an updated version with changes (if any) to the page

-genMap()
Generates and initializes the map with the users desired requirements.


# index-with-api.html

An example of how to use the microservice to call an API and get back map results.


# map.class.js

Creates the map from the parameteres passed from index.html

-init()
Sets the map up

-resetMap()
Clearing the generated map

-findPath(startX, startY, endX, endY)
Pathfinder using given arguments, passed numbers should be array starting points and array ending points
Returns path


-fillPath(path, tileType)
 Takes a path and fills the map of with the tileType passed in

-addRandomRooms(numRooms)

Randomizer function that takes a random amount of rooms with a random size as well and adds them to the map


-isEmpty(StartX, StartY,size,Buffer)
Takes the starting point, the size of the room, and a desired buffer to check if the slate is empty.
returns false if it is not.
returns true if it is.

-addRoom(x,y,roomSize)
Fucntion to add rooms to the grid, takes the starting point (x,y) and the roomSize (randomized size)
and adds to the grid

-toString()
Prints out the map starting with the y axis first, in text only with no html or formatting tags

-toHTML()
Prints out the map using HTML tags



--

# How to Setup

Clone the repo

Open public/index.html in a browser...play

OR

prompt:> npm install
prompt:> npm start

You should see a prompt that the server is listening on port 3000

Open a browser to http://localhost:3000/index.html 
Open a browser to http://localhost:3000/index-with-api.html

To change the port, edit the server.js file and set the port number to what you'd like.

# Credits

Original Author: Markus Beamer

Contributions from:

ASTAR Logic - http://github.com/bgrins/javascript-astar
jquery - http://www.jquery.com







