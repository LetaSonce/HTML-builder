const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const folderComponents = path.join(__dirname, 'components');
const folderStyles = path.join(__dirname, 'styles');
const folderAssets = path.join(__dirname, 'assets');
const assetsDist = path.join(projectDist, 'assets');

const tmplFile = path.join(__dirname, 'template.html');
const htmlFile = path.join(projectDist, 'index.html');
const styleFile = path.join(projectDist, 'style.css');
const writeStream = fs.createWriteStream(styleFile);

fsPromises.mkdir(projectDist, { recursive: true });

const templateHTML = () => {
  return fsPromises
    .readdir(folderComponents, { withFileTypes: true })
    .then((files) => {
      return fsPromises.readFile(tmplFile, 'utf-8').then((str) => {
        const promises = files.map((file) => {
          const nameComponent = path.parse(file.name).name;
          const fileComponent = path.join(folderComponents, file.name);
          return fsPromises
            .readFile(fileComponent, 'utf-8')
            .then((curComponent) => {
              str = str.replaceAll(`{{${nameComponent}}}`, curComponent);
            });
        });
        return Promise.all(promises).then(() => {
          return fsPromises.writeFile(htmlFile, str);
        });
      });
    })
    .catch((error) => console.log(error.message));
};

const bundleStyles = () => {
  return fsPromises
    .readdir(folderStyles, { withFileTypes: true })
    .then((files) => {
      files.forEach((file) => {
        if (file.isFile() && path.extname(file.name) === '.css') {
          const pathFileStyle = path.join(folderStyles, file.name);
          fs.createReadStream(pathFileStyle, 'utf-8').pipe(writeStream);
        }
      });
    })
    .catch((error) => console.log(error.message));
};

const copyAssets = (fold, copyFold) => {
  return fsPromises
    .mkdir(copyFold, { recursive: true })
    .then(() => fsPromises.readdir(fold, { withFileTypes: true }))
    .then((files) => {
      files.forEach((file) => {
        const srcFile = path.join(fold, file.name);
        const distFile = path.join(copyFold, file.name);

        file.isDirectory()
          ? copyAssets(srcFile, distFile)
          : fsPromises.copyFile(srcFile, distFile);
      });
    })
    .catch((error) => console.log(error.message));
};

templateHTML();
bundleStyles();
copyAssets(folderAssets, assetsDist);
