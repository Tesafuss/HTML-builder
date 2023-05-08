const fs = require('fs');
const path = require('path');

// Ссылки на основные папки
const adressStyles = path.join(__dirname, 'styles');
const adressMergeStyles = path.join(__dirname, 'project-dist', 'bundle.css');

// Ссылки на тестовое папки
// const adressStyles = path.join(__dirname, 'test-files', 'styles');
// const adressMergeStyles = path.join(__dirname, 'test-files', 'bundle.css');

fs.writeFile(adressMergeStyles, '', (err) => {
  if (err) console.log('Ошибка при удалении bundle.css');
});

fs.readdir(adressStyles, (err, items) => {
  if (err) throw 'Ошибка при чтении папки по адресу';

  items.map((elem) => {
    let elemCopyAdress = path.join(adressStyles, elem);
    let elemExtname = path.extname(elem);

    if (elemExtname === '.css') {
      let readStream = fs.createReadStream(elemCopyAdress, 'utf-8');

      readStream.on('data', (chunk) => {
        fs.appendFile(adressMergeStyles, chunk, (err) => {
          if (err) throw 'Ошибка при записи чанка в файл';
        });

        readStream.on('end', () =>
          console.log(`Файл по адресу ${elemCopyAdress} скопирован`)
        );
        readStream.on('error', (error) =>
          console.log('Ошибка при записи чанка в файл 2', error.message)
        );
      });
    }
  });
});
