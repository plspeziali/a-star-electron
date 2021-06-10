# Algoritmo A* - Nocentini, Speziali

## Prerequisiti

 - NodeJS
 - Java (Opzionale per aggiungere nuove mappe)

## Utilizzo dell'applicazione
In caso non si abbia a disposizione un compilatore NodeJS nella propria macchina è disponibile una versione pre-compilata dal peso di circa 88 MB a [questo link](https://mega.nz/file/hjxCxQTB#eYS6HAtGMC9bcVOzCS7Un-38rgCIP8pZ-2y2O8D-WYE). In caso si scarichi questa seconda versione è possibile avviare l'applicativo cliccando sull'eseguibile `a-star-electron.exe` e accedere al codice sorgente nella directory `.\resources\app\`
Aprendo il terminale nella cartella principale e digitando `npm install` installerete le dipendenze necessarie all'avvio dell'applicativo e con `npm start` avvierete l'applicazione che, tramite il framework Electron, mostrerà l'interfaccia per poter operare sui grafi.
In basso è presente una casella per inserire il nome dei due file con estensione `.cnode` e `.cedge` che conterranno, rispettivamente, i nodi e gli archi del grafo con longitudine e latitudine geospaziali. Di default si visualizzerà quello corrispondente alle strade californiane, nella cartella `astar/maps` sono però presenti altri file da poter testare.
Con le due caselle di input è possibile selezionare gli indici dei due nodi per cui si desidera visualizzare la strada migliore. Durante la scelta sarà possibile visualizzare nel paragrafo sottostante le coordinate dei nodi scelti. Una volta presi i due nodi, premendo il tasto **Calcola** sarà possibile visualizzare a schermo il percorso.
La mappe disponibili di cui poter scrivere il nome per eseguire dei test sono `cal` [California], `perugia` [Perugia], `sanmariano` [San Mariano di Corciano (PG)] e `tuoro` [Tuoro sul Trasimeno (PG)].
 
## Aggiunta di nuove mappe

Tramite la funzione di esportazione del portale [OpenStreetMap](https://www.openstreetmap.org/) è possibile scegliere una qualsiasi zona del mondo ed esportarne un file `.osm` che ne descrive le strade sotto forma di grafo. Per poterla però utilizzare con il nostro software, in quanto ci siamo attenuti al formato trovato nei file del [California Road Network](https://www.cs.utah.edu/~lifeifei/SpatialDataset.htm), occorre prima convertirlo in un file `.json` utilizzando l'applicazione in Java [OSMGraphParser](https://github.com/rovaniemi/osm-graph-parser) e, infine, inserirlo nella cartella `parser` e digitare da terminale il comando `node convert.js [nomefile].json` cambiando [nomefile] con il nome del file in formato JSON ottenuto. In questo modo verranno generati nella cartella corrente due file `.cnode` e `.cedge` da poter inserire nella cartella `astar/maps` e utilizzare con l'applicazione.