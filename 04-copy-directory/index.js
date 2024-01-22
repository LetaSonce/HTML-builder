const fsPromises = require('fs').promises;
const path = require('path');

const filesDir = path.join(__dirname, 'files');
const filesCopyDir = path.join(__dirname, 'files-copy');

fsPromises
  .mkdir(filesCopyDir, { recursive: true })
  .then(() => fsPromises.readdir(filesDir, { withFileTypes: true }))
  .then((files) => {
    files.forEach((file) => {
      const srcFile = path.join(filesDir, file.name);
      const distFile = path.join(filesCopyDir, file.name);
      fsPromises.copyFile(srcFile, distFile);
    });
  });
