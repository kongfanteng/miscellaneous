// 挂载app；调用createApp；
import { createApp } from './main'
const { app, router, store } = createApp()
// 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__，自动嵌入到最终的 HTML 中
// 在客户端挂载到应用程序之前，store就应该获取到状态
if(window.__INITIAL_STATE__){
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  app.$mount('#app')
})
