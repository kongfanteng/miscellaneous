const http = require('http')

http
  .createServer((req, res) => {
    res.setHeader('Content-Type', 'text/json')
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'x-test-cors',
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, POST',
      'access-control-max-age': 1000,
    })
    res.end('123')
  })
  .listen(8887, () => {
    console.log('2.server is running')
  })
