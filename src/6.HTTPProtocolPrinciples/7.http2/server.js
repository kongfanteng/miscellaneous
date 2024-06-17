const http = require('http')
const fs = require('fs')

http
  .createServer((req, res) => {
    if (req.url === '/') {
      const data = fs.readFileSync('test.html', 'utf-8')
      res.writeHead(200, {
        'Content-Type': 'text/html',
        link: '</test.png>; as=image; rel=preload',
      })
      res.end(data)
    } else {
      const data = fs.readFileSync('test.png')
      res.writeHead(200, {
        'Content-Type': 'image/png',
      })
      res.end(data)
    }
  })
  .listen(8888, () => {
    console.log('1.server is running 8888')
  })
