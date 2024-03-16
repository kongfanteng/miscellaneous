const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const port = 3000
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  const filePath = path.join(__dirname, pathname)
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': req.headers.origin,
        'access-control-allow-credentials': true,
        'access-control-allow-methods': 'GET, POST, DELETE, PUT',
        'access-control-allow-headers':
          'Content-Type, Accept, X-Requested-With, X-HTTP-Method-Override, Content-Length, Authorization, Accept-Language, Accept-Encoding, X-Forwarded-For, X-Forwarded-Host, X-Forwarded-Server, X-Forwarded-Proto, X-Originating-IP, X-Real-IP, Host, Connection, Referer, Cookie, User-Agent, Origin, Pragma, Cache-Control',
      })
      console.log('req.headers.origin:', req.headers.origin)
      res.write(pathname)
      res.end()
    } else {
      res.writeHead(200)
      res.write(data)
      res.end()
    }
  })
})
server.listen(port, () => console.log(`server is listening on port ${port}`))
