const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const pathFile = path.join(__dirname, 'text.txt');
const newFile = fs.createWriteStream(pathFile);

stdout.write('Hello student Rolling Scope!\nWrite your text and press "Enter" Write "exit" or press "ctrl + c" to stop:\n');
stdin.on('data', (data) => {
  let str = data.toString();
  str === 'exit\n' 
  ? terminate()
  : newFile.write(str);
});

process.on('SIGINT', () => terminate());

function terminate() {
  stdout.write('\nBye! Good luck!');
  process.exit();
}
