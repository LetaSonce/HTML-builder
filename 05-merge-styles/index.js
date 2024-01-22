const fs = require('fs');
const path = require('path');

const folderStyles = path.join(__dirname, 'styles');
const folderDist = path.join(__dirname, 'project-dist');
const bundelFile = path.join(folderDist, 'bundle.css');

fs.readdir(folderStyles, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err.message);

  const fileWriteStream = fs.createWriteStream(bundelFile);

  files.forEach((file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const currentFile = path.join(folderStyles, file.name);
      fs.createReadStream(currentFile, 'utf-8').pipe(fileWriteStream);
    }
  });
});
