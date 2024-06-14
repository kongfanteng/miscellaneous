const http = require('http')
const fs = require('fs')

http
  .createServer((req, res) => {
    if (req.url === '/') {
      res.writeHead(302, {
        Location: '/new',
      })
      res.end('')
    }
    if (req.url === '/new') {
      const data = fs.readFileSync('test.html', 'utf-8')
      res.writeHead(200, {
        'Content-Type': 'text/html',
      })
      res.end(data)
    }
  })
  .listen(8888, () => {
    console.log('1.server is running 8888')
  })
