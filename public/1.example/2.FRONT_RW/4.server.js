const http = require('http')
const url = require('url')
const port = 3000
const twoAddRoutes = [
  {
    path: '/permission',
    component: {
      template: `<div>Layout<router-view></router-view></div>`,
    },
    redirect: `/permission/index`,
    allowShow: true,
    name: 'layout',
    meta: {
      title: 'permission',
      role: ['admin', 'editor'],
    },
    children: [
      {
        path: 'page',
        component: {
          template: `<div>/permission/page</div>`,
        },
        name: 'pagePerssion',
        meta: {
          title: 'pagePerssion',
          role: ['admin'],
        },
      },
      {
        path: 'direction',
        component: {
          template: `<div>/permission/direction</div>`,
        },
        name: 'directionPerssion',
        meta: {
          title: 'directionPerssion',
          role: ['editor'],
        },
      },
    ],
  },
]

const menuRoutes = [
  { path: '/', component: 'home' },
  { path: '/user', component: 'userInfo' },
]

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': req.headers.origin,
    'access-control-allow-credentials': true,
    'access-control-allow-methods': 'GET, POST, DELETE, PUT',
    'access-control-allow-headers': '*',
  })
  if (req.headers.token === 'errToken') {
    res.write(JSON.stringify({ code: 40099, msg: 'token过期了' }))
    return res.end()
  }
  if (pathname === '/getRouters') {
    res.write(JSON.stringify(twoAddRoutes))
    return res.end()
  }
  if (pathname === '/accessMenu') {
    res.write(JSON.stringify(['admin']))
    return res.end()
  }
  if (pathname === '/menuRoutes') {
    res.write(JSON.stringify(menuRoutes))
    return res.end()
  }
  res.write(pathname)
  res.end()
})
server.listen(port, () => console.log(`server is listening on port ${port}`))
