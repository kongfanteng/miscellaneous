# 实现SSR

## 项目结构

```sh
package.json
vue.config.js
public
|—— index.html # html文件
src
|—— router
|———— index.js # 路由
|—— store
|———— index.js # 状态管理
|—— main.js # 入口文件
|—— entry——client.js # 客户端入口文件
|—— entry——server.js # 服务端入口文件
|—— public
|———— index.html # html文件
|—— App.vue # 根组件
|—— server
|———— index.js # 服务端启动文件
```

## 安装插件

```sh
pnpm i vue@2 vue-router@3 vuex@3 @vue/cli-service@4.5.13 @vue/cli-plugin-pwa@4.5.13
pnpm install vue-server-renderer lodash.merge webpack-node-externals cross-env --save-dev
```