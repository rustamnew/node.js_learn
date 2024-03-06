const fs = require('fs')
const path = require('path')

//Абсолютный путь 
const absolutePath = path.join(__dirname, './data/data1.json');
//console.log(__dirname)
console.log(absolutePath)

//Проверка существования папки
function checkDir(pathDir = './data') {
    if (fs.existsSync(pathDir)) {
        console.log(true)
    } else {
        console.log(false)
    }
}

//Инфо о файле
function checkFile(pathFile = './data/data.json') { 
    const fileInfo = fs.statSync(pathFile)

    if (fs.existsSync(pathFile)) {
        console.log(fileInfo.size + ' Байт')
        //console.log(path.basename(pathFile))
        //console.log(path.extname(pathFile))
        //console.log(path.dirname(pathFile))
        console.log(path.parse(pathFile))
    } else {
        console.log(false)
    }
}

//Инфо о файлах в папке
function checkDirFiles(pathDir = './data') {
    if (fs.existsSync(pathDir)) {
        const all_files = fs.readdirSync(pathDir)

        all_files.forEach( (item) => {
            const item_path = pathDir + '/' + item

            checkFile(item_path)
        });
    } else {
        console.log(false)
    }
}

checkDir()
console.log('-----')
checkFile()
console.log('-----')
checkDirFiles()