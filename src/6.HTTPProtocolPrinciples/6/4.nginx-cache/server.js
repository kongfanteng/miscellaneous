const http = require('http')
const fs = require('fs')

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms * 1000))

http
  .createServer(async (req, res) => {
    if (req.url === '/') {
      const data = fs.readFileSync('test.html', 'utf-8')
      res.writeHead(200, {
        'Content-Type': 'text/html',
        
      })
      res.end(data)
    }
    if (req.url === '/data') {
      await wait(2)
      res.writeHead(200, {
        'Cache-Control': 's-maxage=200',
        vary: 'x-test-cache',
      })
      res.end('success')
    }
  })
  .listen(8889, () => {
    console.log('1.server is running 8889')
  })
