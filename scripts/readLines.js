let readline = require('readline');
let fs = require('fs');

let myInterface = readline.createInterface({
    input: fs.createReadStream('file2Read.txt')
});

let lineNum = 0;
myInterface.on('line',function(line){
    lineNum++;
    console.log('Line number ' + lineNum + ': ' + line);
});
