const http = require('http')
const fs = require('fs')
const path = require('path')

http
  .createServer((req, res) => {
    const data = fs.readFileSync('3.test.html', 'utf-8')
    res.setHeader('Content-Type', 'text/html')
    res.end(data)
  })
  .listen(8888, () => {
    console.log('1.server is running 8888')
  })
