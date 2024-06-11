const http = require('http')
const fs = require('fs')

http
  .createServer((req, res) => {
    if (req.url === '/') {
      const data = fs.readFileSync('test.html', 'utf-8')
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    }
    if (req.url === '/script.js') {
      const etag = req.headers['if-none-match']
      let code = 200
      if (etag === '777') {
        code = 304
      }
      res.writeHead(code, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=200, no-cache',
        etag: '777',
        'Last-Modified': '123',
      })
      res.end('console.log("script loaded")')
    }
  })
  .listen(8888, () => {
    console.log('1.server is running 8888')
  })
