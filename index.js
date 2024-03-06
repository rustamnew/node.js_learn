const fs = require('fs')
const path = require('path')

//Чтение
const pathReadFile = './data/data1.json'

const data = fs.readFileSync(pathReadFile, { //получение текстового содержимого
    encoding: 'utf8', //кодировка
    //flag: 'r' //по умолчанию - для чтения
})
console.log(data)
console.log(data.split('\r\n')) //разбить по строкам
console.log(JSON.parse(data)) //получить объект



//Запись
const data_obj = JSON.parse(data)
data_obj.user.count++

console.log(data_obj)

const edited_data_string = JSON.stringify(data_obj, null, 4)

fs.writeFileSync('./data/data_temp.json', edited_data_string, { //Синхронная
    encoding: 'utf8',
    //flag: 'a', //Добавить
    flag: 'w', //Переписать
})

fs.writeFile('./data/data_temp1.json', edited_data_string, /*{flag: 'a'}, Необязательный параметр с конфигом*/ function(error){ //Асинхронная
    if(error){  // если ошибка
        return console.log(error);
    }
    console.log("Файл успешно записан");
});