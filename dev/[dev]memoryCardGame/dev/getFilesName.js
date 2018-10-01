const fs = require('fs')
const path = require('path');

const files = fs.readdirSync('./svg')
files.forEach( n => {
  console.log(`"${path.basename(n, '.svg')}",`);
  
})

// node getFilesName.js --> print all files name.