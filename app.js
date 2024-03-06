const http = require('http')
const fs = require('fs')
const path = require('path')
const PORT = 3500

const extContentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.txt': 'text/plain',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'woff': 'application/font-woff',
    'woff2': 'application/font-woff2',
    'ttf': 'application/font-ttf',
    'eot': 'application/vnd.ms-fontobject',
    'otf': 'application/font-otf',
    'swf': 'application/x-shockwave-flash',
    'wasm': 'application/wasm'    
}


http.createServer( function(req, res) {
    const url = req.url

    res.setHeader('Content-type', 'text/html; charset=utf-8;')

    switch(url) {
        case '/':
            getFileContent(res, './public/index.html')
            break;

        case '/content':
            getFileContent(res, './public/content.html')
            break;

        case '/about':
            getFileContent(res, './public/about.html')
            break;

        case '/404':
            getFileContent(res, './public/404.html')
            break;

        default:
            const extname = String(path.extname(url)).toLocaleLowerCase()

            if (extname in extContentTypes) {
                getFileContent(res, './public' + url, extname)
            }
            if (fs.existsSync('./public' + url)) {
                
            } else {
                getFileContent(res, './public/404.html')
            }
            break;
    }
}).listen(PORT)


function getFileContent(res, path, ext = false) {
    /////
    if (!ext) {
        ext = String(path).toLocaleLowerCase().split('.')
        ext = '.' + ext[ext.length - 1]
    }
    /////
    res.setHeader('Content-type', extContentTypes[ext] ? extContentTypes[ext] : 'text/html')

    const params = {}
    if (ext !== '.png') {
        params.encoding = 'utf8'
    }
    params.flag = 'r'

    fs.readFile(path, params, (error, data) => {
        if (error) {
            console.log(error)
            res.statusCode = 404
            res.end()
        }
        res.end(data)
    })
}