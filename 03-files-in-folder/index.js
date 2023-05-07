const path = require('path');
const fs = require('fs');
const { stdout } = require('process');

let secretAdress = path.join(__dirname, 'secret-folder');

fs.readdir(secretAdress, (err, items) => {
  if (err) throw err;

  items.map((elem) => {
    let itemAdress = path.join(__dirname, 'secret-folder', elem);
    
    fs.stat(itemAdress, (err, stats) => {
      if (err) throw err;

      if(stats.isFile()){
        let itemName = path.basename(itemAdress, path.extname(itemAdress));
        let  itemExtname = path.extname(itemAdress).slice(1);
        let itemSize = (stats['size']/(1024)).toFixed(2) + 'kb';
        stdout.write(`${itemName} - ${itemExtname} - ${itemSize} \n`);
      }
    });
  });
});
