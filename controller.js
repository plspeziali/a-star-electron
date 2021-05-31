/**
 * Adds a polyline between Dublin, London, Paris and Berlin to the map
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */

const electron = require('electron');
const fs = window.require('fs');
const GraphCreator = require('./astar/graphCreator');
const AstarPQ = require('./astar/astarPQ');
var vertices;

var g = GraphCreator.createGraph('./astar/maps/cal.cnode','./astar/maps/cal.cedge');
vertices = g.getVertices();
let vertNum = vertices.length-1;
$(".vert-form").append("<label for='vertA'>Primo vertice</label><br><input class='vertBox' type='number' value=11305 id='vertA' name='vertA' min='0' max='"+vertNum+"'><br><br>");
$(".vert-form").append("<label for='vertB'>Secondo vertice</label><br><input class='vertBox' type='number' value=8723 id='vertB' name='vertB' min='0' max='"+vertNum+"'><br><br>");

$( ".vertBox" ).change(function() {
  map.removeObjects(map.getObjects());
  var vertA = $("#vertA").val();
  var vertB = $("#vertB").val();
  if(typeof(vertA) != "undefined"){
    var vertA = $("#vertA").val();
    var vertAMarker = new H.map.Marker({lat:vertices[vertA].y, lng:vertices[vertA].x});
    map.addObject(vertAMarker);
  }
  if(typeof(vertB) != "undefined"){
    var vertBMarker = new H.map.Marker({lat:vertices[vertB].y, lng:vertices[vertB].x});
    map.addObject(vertBMarker);
  }
});

function calculateDistance(){
  var vertA = $("#vertA").val();
  var vertB = $("#vertB").val();
  if(typeof(vertA) != "undefined" && typeof(vertB) != "undefined" && vertA != vertB){
    start = Date.now();
    let routePQ = AstarPQ.aStar(vertices[vertA],vertices[vertB],g);
    millis = Date.now() - start;

    var lineString = new H.geo.LineString();
    console.log(routePQ);
    for(el of routePQ){
      lineString.pushPoint({lat:vertices[el].y, lng:vertices[el].x});
    }
    map.addObject(new H.map.Polyline(
      lineString, { style: { lineWidth: 4 }}
    ));
  }
}



/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: ""
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:vertices[0].y, lng:vertices[0].x},
  zoom: 5,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);


