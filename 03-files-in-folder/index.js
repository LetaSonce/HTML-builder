const fs = require('fs');
const path = require('path');

const currentDirectory = path.join(__dirname, 'secret-folder');

fs.readdir(currentDirectory, { withFileTypes: true }, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }

  files.forEach((file) => {
    const extFile = path.extname(file.name);
    const currentPath = `${currentDirectory}/${file.name}`;
    fs.stat(currentPath, (err, stats) => {
      if (err) {
        console.error(err);
      } else {
        if (!file.isDirectory()) {
          const sizeFile = Math.round(stats.size / 1000);
          console.log(`${file.name} - ${extFile} - ${sizeFile} Kb`);
          //console.log(stats);
        }
      }
    });
  });
});
