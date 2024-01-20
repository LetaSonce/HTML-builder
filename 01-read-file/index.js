const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const pathFile = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(pathFile, 'utf-8');

eventEmitter.on('begin', () => {
  console.log('Start reading file...');
  readableStream.on('data', (chunk) => console.log(chunk));
});

eventEmitter.on('end', () => {
  console.log('Finish reading file.');
});

eventEmitter.emit('begin');
eventEmitter.emit('end');
