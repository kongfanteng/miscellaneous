// 定义 context；调用 createApp;
import { createApp } from './main'
export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context)
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('404'))
      }
      Promise.all(
        matchedComponents.map((component) => {
          if (component.asyncData) {
            return component.asyncData({ store, route: router.currentRoute })
          }
        })
      )
        .then(() => {
          // 所有预取钩子 resolve 后
          // store 已经填充入渲染应用所需状态
          // 将状态附加到上下文，且`template`选项用于 renderer时
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入HTML
          context.state = store.state
          resolve(app)
          router.afterEach(() => {
            window.scrollTo(0, 0)
          })
        })
        .catch(reject)
    }, reject)
  })
}
