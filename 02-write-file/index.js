const { stdout } = process;
const fs = require('fs');
const path = require('path');
const { stdin } = require('process');

const fileAdress = path.join(__dirname, 'text.txt');

fs.writeFile(fileAdress, '', (err) => {
  if (err) throw err;
});

stdout.write('Пожалуйста, введите текст\n');
stdin.on('data', (data) => {
  fs.appendFile(fileAdress, data, (err) => {
    if (err) throw err;
  });
  if (data.toString().slice(0, 4) === 'exit') {
    process.on('exit', () => stdout.write('Файл, закрыт. Удачи!'));
    process.exit();
  }
});
