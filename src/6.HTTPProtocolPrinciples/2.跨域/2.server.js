const http = require('http')

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
    })
    res.end('123')
  })
  .listen(8887, () => {
    console.log('2.server is running')
  })
