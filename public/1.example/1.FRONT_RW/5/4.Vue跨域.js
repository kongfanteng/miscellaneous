// 提纲: CROS; ProxyDevServer; Proxy服务器; ProxyNginx;
CROS = () => {
  ;`设置 Access-Control-Allow-Origin`
  console.log(`app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    // ...
  })`)
}
// CROS()
ProxyDevServer = () => {
  ;`通过 webpack 起一个本地服务做代理`
  console.log(`module.exports = {
    devServer: {
      host: '127.0.0.1',
      port: 8000,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }`)
  ;`配置 axios`
  console.log(`axios.defaults.baseURL = '/api'`)
}
// ProxyDevServer()
Proxy服务器 = () => {
  ;`服务器实现代理转发`
  console.log(`
    const express = require('express')
    const proxy = require('http-proxy-middleware')
    const app = new express()
    app.use(express.static(__dirname, '/'))
    app.use('/api', proxy({
      target: 'http://localhost:3000',
      changeOrigin: false,
      pathRewrite: {
        '^/api': '/api'
      }
    }))
    module.exports = app
  `)
}
// Proxy服务器()
ProxyNginx = () => {
  ;`nginx 实现代理`
  console.log(`
    server {
      listen 80;
      location / {
        root /var/www/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
      }
      location /api {
        proxy_pass http://127.0.0.1:3000;
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      }
    }
  `)
}
ProxyNginx()
