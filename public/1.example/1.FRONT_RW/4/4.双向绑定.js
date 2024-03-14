// 提纲: MVVM实现；
// MVVM实现: 构造函数Vue; data响应化; 编译Compile; 依赖收集; 声明Dep; 创建Dep实例;
/**
 * @example
 *
 * 使用:
  const Vue = 构造函数Vue(observe, proxy, Compile)
  new Vue({
    el: '#app',
    data: {
      msg: 'hello'
    }
  })
 * 
 */
const 构造函数Vue = (observe = () => {}) => {
  class Vue {
    constructor(options) {
      this.$options = options
      this.$data = options.data
      // 对 data 选项做响应式处理
      observe(this.$data)
      // 代理 data 到 vm 上
      proxy(this)
      // 执行编译
      new Compile(options.el, this)
    }
  }
  return Vue
}

/**
 * 
 * @param {*} defineReactive 
 * @example
 *
 * 使用:
    const defineReactive = () => {}
    const observe = data响应化(defineReactive)
    observe({
      msg: 'hello',
    })
 * 
 * @returns 
 */
const data响应化 = (defineReactive = () => {}) => {
  function observe(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return
    }
    new Observer(obj)
  }
  class Observer {
    constructor(value) {
      this.value = value
      this.walk(value)
    }
    walk(obj) {
      Object.keys(obj).forEach((key) => {
        defineReactive(obj, key, obj[key])
      })
    }
  }
  return observe
}
/**
 * @example
 *
 * 使用:
  const Compile = 编译Compile()
  const el = '#app'
  const vm = ''
  new Compile(el, vm)
 */
const 编译Compile = () => {
  class Compile {
    constructor(el, vm) {
      this.$vm = vm
      this.$el = document.querySelector(el)
      if (this.$el) {
        this.compile(this.$el)
      }
    }
    compile(el) {
      const childNodes = el.childNodes
      Array.from(childNodes).forEach((node) => {
        // 遍历子元素
        if (this.isElement(node)) {
          // 判断是否为节点
          console.log(`编译元素`)
        } else if (this.isInterpolation(node)) {
          console.log('编译插值文本', node.nodeName)
        }
        if (node.childNodes && node.childNodes.length > 0) {
          // 判断是否有子元素
          this.compile(node)
        }
      })
    }
    isElement(node) {
      return node.nodeType == 1
    }
    isInterpolation(node) {
      return node.nodeType == 3 && /^\{\{(.*)\}\}$/.test(node.nodeValue)
    }
  }
  return Compile
}

/**
 * 
 * @param {*} Dep 
 * @returns 
 * @example
 *
 * 使用:
    const Dep = {},vm = '', key = '', updater = ()=>{}
    const Watcher = 依赖收集(Dep)
    new Watcher(vm, key, updater)
 * 
 */
const 依赖收集 = (Dep) => {
  // 负责更新视图
  return class Watcher {
    constructor(vm, key, updater) {
      this.vm = vm
      this.key = key
      this.updaterFn = updater

      // 创建实例时，把当前实例指定到 Dep.targe 静态属性上
      Dep.target = this
      // 读一下key，触发 get
      vm[key]
      // 置空
      Dep.target = null
    }
    // 未来执行DOM更新函数，由 dep 调用
    update() {
      this.updaterFn.call(this.vm, this.vm[this.key])
    }
  }
}

/**
 * 
 * @example
 * 
 * 使用:
    const Dep = 声明Dep()
    const dep = new Dep()
 */
const 声明Dep = () => {
  return class Dep {
    constructor() {
      this.deps = []
    }
    addDep(dep) {
      this.deps.push(dep)
    }
    notify() {
      this.deps.forEach((dep) => dep.update())
    }
  }
}

/**
 * 
 * @param {*} Dep 
 * @param {*} observe 
 * @returns 
 * @example
 *
 * 使用:
    const Dep = function () {},
    obj = { 1: 2 },
    key = 1,
    val = obj[key],
    observe = () => {}
    const defineReactive = 创建Dep实例(Dep, observe)
    defineReactive(obj, key, val)
 * 
 */

const 创建Dep实例 = (Dep, observe) => {
  return function defineReactive(obj, key, val) {
    observe(val)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addDep(Dep.target) // Dep.target 为 Watcher 实例
        return val
      },
      set(newVal) {
        if (val === newVal) return
        dep.notify() // 通知dep执行更新方法
      },
    })
  }
}
