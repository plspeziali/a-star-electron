# Algoritmo A* - Nocentini, Speziali

## Prerequisiti

 - NodeJS
 - Java (Opzionale per aggiungere nuove mappe)

## Utilizzo dell'applicazione

In caso non si abbia a disposizione un compilatore NodeJS nella propria macchina è disponibile una versione pre-compilata
dal peso di circa 88 MB a questo link: https://mega.nz/file/YuYjGADB#NHcauPhIGdQv5f5BDIJhnn2HOrTdu5VA7vWjo50EKZc
In caso si scarichi questa seconda versione è possibile avviare l'applicativo cliccando sull'eseguibile "a-star-electron.exe"
e accedere al codice sorgente nella directory ".\resources\app\".
Nel caso invece si abbia a disposizione NodeJS per avviare la versione non compilata occorrerà aprire il terminale nella cartella principale.
Digitando "npm install" installerete le dipendenze necessarie all'avvio dell'applicativo
e con "npm start" avvierete l'applicazione che, tramite il framework Electron, mostrerà l'interfaccia per poter operare sui grafi.
In basso è presente una casella per inserire il nome dei due file con estensione ".cnode" e ".cedge" che conterranno, rispettivamente,
i nodi e gli archi del grafo con longitudine e latitudine geospaziali. Di default si visualizzerà quello corrispondente alle strade californiane,
nella cartella "astar/maps" sono però presenti altri file da poter testare.
Con le due caselle di input è possibile selezionare gli indici dei due nodi per cui si desidera visualizzare la strada migliore.
Durante la scelta sarà possibile visualizzare nel paragrafo sottostante le coordinate dei nodi scelti. Una volta presi i due nodi,
premendo il tasto Calcola sarà possibile visualizzare a schermo il percorso.
La mappe disponibili di cui poter scrivere il nome per eseguire dei test sono "cal" [California], "perugia" [Perugia],
"sanmariano" [San Mariano di Corciano (PG)] e "tuoro" [Tuoro sul Trasimeno (PG)].

 
## File d'interesse

I file del progetto effettivamente scritti da noi sono 
 - index.html (che sfrutta componenti di HERE Map) è l'interfaccia grafica dell'applicazione che sfrutta il framework Electron;
 - controller.js (che sfrutta componenti di HERE Map) è la parte che collega l'interfaccia alle API di HERE Map e al nostro codice dell'algoritmo A*;
 - il contenuto delle directory astar/ e Latex/

All'interno alla directory astar/ troviamo:
 - maps/ che contiene i file che descrivono i grafi;
 - astar.js che contiene l'algoritmo A* senza l'uso delle coda di priorità;
 - astarPQ.js che contiene l'algoritmo A* che usa la coda di priorità ma non richiama l'operazione di decreaseKey;
 - astarPQDC.js che contiene l'algoritmo A* che usa la coda di priorità e richiama l'operazione di decreaseKey (è l'algoritmo usato nell'applicazione Electron);
 - astarCS.js che contiene l'algoritmo A* che usa la coda di priorità, richiama l'operazione di decreaseKey e utilizza un closedSet;
 - graph.js, classe che descrive un oggetto di tipo grafo;
 - graphCreator.js che permette la creazione di un oggetto grafo presi in input i file dentro la directory maps/;
 - priorityQueue.js, classe che descrive un oggetto di tipo PriorityQueue;
 - vertex.js, classe che descrive un oggetto di tipo Vertex;
 - main.js, script che permette di confrontare le velocità dei vari algoritmi A*, utilizzato nei test.

 
## Aggiunta di nuove mappe

Tramite la funzione di esportazione del portale OpenStreetMap (https://www.openstreetmap.org/) è possibile scegliere una qualsiasi zona del mondo
ed esportarne un file ".osm" che ne descrive le strade sotto forma di grafo. Per poterla però utilizzare con il nostro software,
in quanto ci siamo attenuti al formato trovato nei file del California Road Network (https://www.cs.utah.edu/~lifeifei/SpatialDataset.htm),
occorre prima convertirlo in un file ".json" utilizzando l'applicazione in Java OSMGraphParser (https://github.com/rovaniemi/osm-graph-parser) e,
infine, inserirlo nella cartella "parser" e digitare da terminale il comando "node convert.js [nomefile].json" cambiando [nomefile]
con il nome del file in formato JSON ottenuto. In questo modo verranno generati nella cartella corrente due file ".cnode" e ".cedge"
da poter inserire nella cartella "astar/maps" e utilizzare con l'applicazione.