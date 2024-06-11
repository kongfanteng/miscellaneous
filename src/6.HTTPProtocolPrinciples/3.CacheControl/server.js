const http = require('http')
const fs = require('fs')
const path = require('path')

http
  .createServer((req, res) => {
    if (req.url === '/') {
      const data = fs.readFileSync('test.html', 'utf-8')
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    }
    if (req.url === '/script.js') {
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=200',
      })
      res.end('console.log("script loaded")')
    }
  })
  .listen(8888, () => {
    console.log('1.server is running 8888')
  })
