const fs = require('fs');
var os = require("os");

var name = process.argv.slice(2);

let rawdata = fs.readFileSync(name+'.json');
let map = JSON.parse(rawdata);
var logger = fs.createWriteStream(name+'.cnode', {
    flags: 'a' // 'a' means appending (old data will be preserved)
})

var i = 0;
for(el of map){
    if(i != 0){
        logger.write(os.EOL);
    }
    logger.write(i + " "+ el.lo + " "+ el.la);
    i++;
}

logger = fs.createWriteStream(name+'.cedge', {
    flags: 'a' // 'a' means appending (old data will be preserved)
})

i = 0;
var e = 0;
for(el of map){
    for(ed of el.e){
        if(e < ed.i){
            if(i != 0){
                logger.write(os.EOL);
            }
            logger.write(i + " "+ e + " "+ ed.i+ " "+ ed.w);
            i++;
        }
    }
    e++;
}