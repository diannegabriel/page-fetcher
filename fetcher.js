const args = process.argv.slice(2);
const request = require('request');
const readline = require('readline');
const fs = require('fs');

// console.log(args[0])

// Prints the download prompt
const printDownload = function(size, fileName) {
  console.log(`Downloaded and saved ${size} bytes to ${fileName}`);
}

// It should take two command line arguments:
const fetcher = ((data) => {
  const url = args[0]; // a URL
  const fileName = args[1]; // a local file path

  // Make HTTP request
  request(url, 'utf8', (error, response, body) => {
    // Stretch: Throwing an error when url is invalid
    if (error) {
      console.log('Error: Invalid URL');
    }
    // Creates the fileName
    fs.writeFile(fileName, body, 'utf8', (error) => {
      // Stretch: If the file path is invalid, the app should fail and let the user know about this issue.
      if (error) {
        console.log(`Error: ${error}`);
      }

      // Processes the data and collects bit size
      fs.stat(fileName, (error, stats) => {
        data(stats.size, fileName)
      });
    });
  });
})

// Stretch: 
// Function that checks if the filename exists
// If it exists, readline to overwrite or not
const check = function(fetcher) {
  const file = args[1]

  // Setup readline / rl
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// Scans if file already exists
fs.access(file, fs.F_OK, (error) => {

  // If there's no error when accessing the file
  if (!error) {
    rl.question('Error! File already exists. Do you wish to overwrite your file? Y/N\n', (key) => {
      if (key === "y" || key === "Y") {
        fetcher(printDownload);
        rl.close();
      } else if (key === "n" || key === "N") {
        rl.close();
      }
    });
  // If the file does not exist, fetcher will be called with printDownload as the argument
  // This will print the download
  } else {
    fetcher(printDownload);
    rl.close();
    // process.exit();
  }
});
}

// check is called to check on fetcher whether the file already exists
// within both check and fetcher, printDownload is called
check(fetcher);

