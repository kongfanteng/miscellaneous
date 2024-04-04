const express = require('express')
const app = express()
// 获取文件路径
const resolve = (dir) => require('path').resolve(__dirname, dir)
// 第一步：开放dist/client目录，关闭默认下载index页的选项，不然到不了后面路由
app.use(express.static(resolve('../dist/client', { index: false })))
// 第二步：获取一个createBundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')
// 第三步：服务端打包文件地址
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
// 第四步：创建渲染器
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: require('fs').readFileSync(resolve('../public/index.html', 'utf8')),
  clientManifest: require(resolve(
    '../dist/client/vue-ssr-clientmanifest.json'
  )),
})
app.get('*', async (req, res) => {
  const context = {
    title: 'ssr test',
    url: req.url,
  }
  const html = await renderer.renderToString(context)
  res.send(html)
})
