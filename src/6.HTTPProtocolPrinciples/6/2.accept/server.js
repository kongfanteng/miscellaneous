const http = require('http')
const fs = require('fs')
const zib = require('zlib')

http
  .createServer((req, res) => {
    console.log(req.headers.host);
    if (req.url === '/') {
      const data = fs.readFileSync('test.html', 'utf-8')
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Encoding': 'gzip',
      })
      res.end(zib.gzipSync(data))
    }
  })
  .listen(8889, () => {
    console.log('1.server is running 8889')
  })
