const http = require('http')

http.createServer( function(req, res) {
    res.setHeader('Content-type', 'text/html; charset=utf-8;')

    console.log(req.url)
    console.log(req.method)
    console.log('')

    res.write(req.url);
    res.write('<br>');
    res.write(req.method);
    
    res.end()
}).listen(3500)