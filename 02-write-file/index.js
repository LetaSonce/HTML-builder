const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const pathFile = path.join(__dirname, 'text.txt');
const newFile = fs.createWriteStream(pathFile);

stdout.write('Enter data:\n');
stdin.on('data', (data) => {
  newFile.write(data);
});

process.on('SIGINT', () => {
  stdout.write('\n\nGood Luck in JavaScript!!!\n\n');
  exit();
});
