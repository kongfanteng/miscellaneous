const http = require('http')
const fs = require('fs')

http
  .createServer((req, res) => {
    const host = req.headers.host
    if (req.url === '/') {
      const data = fs.readFileSync('test.html', 'utf-8')
      res.setHeader('Content-Type', 'text/html')
      console.log('host:', host)
      if (host === 'test.com:8888') {
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Set-Cookie': ['id=123;', 'name=zhangsan; domain=test.com'],
        })
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html',
        })
      }

      res.end(data)
    }
  })
  .listen(8888, () => {
    console.log('1.server is running 8888')
  })
