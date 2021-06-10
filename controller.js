/**
 * @param  {H.Map} map      A HERE Map instance within the application
 */

const electron = require('electron');
const GraphCreator = require(__dirname+'\\astar\\graphCreator');
const Astar = require(__dirname+'\\astar\\astarPQDC');
const fs = require('fs');
var vertices;
var g;
var map;

createGraph();

// Viene richiamata ogni volta che bisogna caricare sulla mappa un nuovo grafo
// Perciò all'inizio e alla pressione del pulsante "Riposiziona"
function createGraph(){
  // Inizializzo tutti valori riguardanti la mappa
  $("#map").empty();
  $("#vertAInput").empty();
  $("#vertBInput").empty();
  $("#latA").empty();
  $("#lonA").empty();
  $("#latB").empty();
  $("#lonB").empty();
  // Prendiamo il nome di file contenenti le informazione del grafo
  var filename = $("#filename").val();
  if(typeof(filename) == "undefined"){
    filename = "cal";
  }
  
  // Creiamo Grafo e lista dei vertici con GraphCreator
  [g, vertices] = GraphCreator.createGraph(__dirname+'\\astar\\maps\\'+filename+'.cnode',__dirname+'\\astar\\maps\\'+filename+'.cedge');
  let vertNum = vertices.length-1;
  $("#vertAInput").append("<label for='vertA'>Primo Nodo</label><br><input class='vertBox' type='number' id='vertA' name='vertA' min='0' max='"+vertNum+"'><br><br>");
  $("#vertBInput").append("<label for='vertB'>Secondo Nodo</label><br><input class='vertBox' type='number' id='vertB' name='vertB' min='0' max='"+vertNum+"'><br><br>");

  // Quando avviene un cambiamento nel div che contiene le inputBox dei vertici
  // La mappa elimina i suoi elementi e ne inserisce di nuovi a seconda dei nuovi valori
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

  // Richiediamo l'accesso alle funzioni di HERE Map tramite la nostra API key
  var platform = new H.service.Platform({
    apikey: fs.readFileSync(__dirname+"\\mapsapikey.txt").toString()
  });
  var defaultLayers = platform.createDefaultLayers();

  // Creazione della mappa tramite le funzioni di HERE
  map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map,{
    center: {lat:vertices[0].y, lng:vertices[0].x},
    zoom: 5,
    pixelRatio: window.devicePixelRatio || 1
  });
  window.addEventListener('resize', () => map.getViewPort().resize());
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  var ui = H.ui.UI.createDefault(map, defaultLayers);
}

// Viene richiamata, tramite il bottone "Calcola",
// La funzione che permette di utilizzare l'algoritmo A*
function calculateDistance(){
  // Prendiamo i valori del vertice Start e del vertice Goal
  var vertA = $("#vertA").val();
  var vertB = $("#vertB").val();
  if(typeof(vertA) != "undefined" && typeof(vertB) != "undefined" && vertA != vertB){
    // Viene calcolato il cammino migliore
    var start = Date.now();
    let [route, N] = Astar.aStar(vertices[vertA],vertices[vertB],g);
    var millis = Date.now() - start;
    var bf = Math.pow(N, 1/route.length);
    console.log(`N = ${N}`);
    console.log(`d = ${route.length}`);
    console.log(`branching factor = ${bf}`);
    console.log(`millis = ${millis}`);
    // Creiamo la polilinea i cui punti sono i nodi del cammino e la aggiungiamo alla mappa
    var lineString = new H.geo.LineString();
    for(el of route){
      lineString.pushPoint({lat:vertices[el].y, lng:vertices[el].x});
    }
    map.addObject(new H.map.Polyline(
      lineString, { style: { lineWidth: 4 }}
    ));
  }
}