const fs = require('fs');
const path = require('path');

function copyDir() {
  // Записали адреса изначальной и новой папок
  const filesDirAdress = path.join(__dirname, 'files');
  const copyDirAdress = path.join(__dirname, 'files-copy');

  // Создаем папку копии
  fs.mkdir(copyDirAdress, { recursive: true }, (err) => {
    if (err) throw err;
  });

  // Удаляем файлы из папки копий
  fs.readdir(copyDirAdress, (err, items) => {
    if (err) throw err;

    items.map((elem) => {
      let itemCopyAdress = path.join(__dirname, 'files-copy', elem);

      fs.unlink(itemCopyAdress, err => {
        if(err) throw err;
      });
    });
  });

  // Добавляем данные из основной папки
  fs.readdir(filesDirAdress, (err, items) => {
    if (err) throw err;

    //Перебираем элементы массива
    items.map((elem) => {
      // Записываем адресс изначального файла и адрес для копии
      let itemAdress = path.join(__dirname, 'files', elem);
      let itemCopyAdress = path.join(__dirname, 'files-copy', elem);

      fs.copyFile(itemAdress, itemCopyAdress, (err) => {
        if (err) throw err;
      });
    });
  });
}

copyDir();
