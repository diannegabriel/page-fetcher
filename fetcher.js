const args = process.argv.slice(2);
const request = require('request');
const fs = require('fs');

// console.log(args[0])

const printDownload = function(size, fileName) {
  process.stdout.write(`Downloaded and saved ${size}mb to ${fileName}\n`);
}

// It should take two command line arguments:
const fetcher = ((data) => {
  const url = args[0]; // a URL
  const fileName = args[1]; // a local file path

  request(url, 'utf8', (error, response, body) => {
    fs.stat(fileName, (error, stats) => {
      data(stats.size, fileName)
    });
  });
})


// Output:
// Downloaded and saved 3261 bytes to ./index.html

fetcher(printDownload);