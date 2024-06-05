const http = require('http')
http
  .createServer((req, res) => {
    console.log(req.url)
    res.end('123')
  })
  .listen(3000)
