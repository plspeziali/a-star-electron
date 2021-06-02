/**
 * Adds a polyline between Dublin, London, Paris and Berlin to the map
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */

const electron = require('electron');
const fs = window.require('fs');
const GraphCreator = require('./astar/graphCreator');
const Astar = require('./astar/astarPQDC');
var vertices;
var g;
var map;

createGraph();

function createGraph(){
  $("#map").empty();
  $("#vertAInput").empty();
  $("#vertBInput").empty();
  var filename = $("#filename").val();
  if(typeof(filename) == "undefined"){
    filename = "cal";
  }
  g = GraphCreator.createGraph('./astar/maps/'+filename+'.cnode','./astar/maps/'+filename+'.cedge');
  vertices = g.getVertices();
  let vertNum = vertices.length-1;
  $("#vertAInput").append("<label for='vertA'>Primo Nodo</label><br><input class='vertBox' type='number' id='vertA' name='vertA' min='0' max='"+vertNum+"'><br><br>");
  $("#vertBInput").append("<label for='vertB'>Secondo Nodo</label><br><input class='vertBox' type='number' id='vertB' name='vertB' min='0' max='"+vertNum+"'><br><br>");

  $( ".vertBox" ).change(function() {
    map.removeObjects(map.getObjects());
    var vertA = $("#vertA").val();
    var vertB = $("#vertB").val();
    if(typeof(vertA) != "undefined" && vertA != ""){
      $("#latA").text(vertices[vertA].y);
      $("#lonA").text(vertices[vertA].x);
      var vertAMarker = new H.map.Marker({lat:vertices[vertA].y, lng:vertices[vertA].x});
      map.addObject(vertAMarker);
    }
    if(typeof(vertB) != "undefined" && vertB != ""){
      $("#latB").text(vertices[vertB].y);
      $("#lonB").text(vertices[vertB].x);
      var vertBMarker = new H.map.Marker({lat:vertices[vertB].y, lng:vertices[vertB].x});
      map.addObject(vertBMarker);
    }
  });

  //Step 1: initialize communication with the platform
  // In your own code, replace variable window.apikey with your own apikey
  var platform = new H.service.Platform({
    apikey: ""
  });
  var defaultLayers = platform.createDefaultLayers();

  //Step 2: initialize a map - this map is centered over Europe
  map = new H.Map(document.getElementById('map'),
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

}

function calculateDistance(){
  var vertA = $("#vertA").val();
  var vertB = $("#vertB").val();
  if(typeof(vertA) != "undefined" && typeof(vertB) != "undefined" && vertA != vertB){
    let routePQ = Astar.aStar(vertices[vertA],vertices[vertB],g);

    var lineString = new H.geo.LineString();
    for(el of routePQ){
      lineString.pushPoint({lat:vertices[el].y, lng:vertices[el].x});
    }
    map.addObject(new H.map.Polyline(
      lineString, { style: { lineWidth: 4 }}
    ));
  }
}