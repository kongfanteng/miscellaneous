// 导出 createRouter
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: {
          render: (h) => h('div', 'index page'),
        },
      },
      {
        path: '/detail',
        component: {
          render: (h) => h('div', 'detail page'),
        },
      },
    ],
  })
}
