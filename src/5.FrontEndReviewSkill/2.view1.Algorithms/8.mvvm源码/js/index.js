/*
new Vue({
  el: '#app',
  data: {
    title: 'vue code',
    name: 'imooc',
  },
  methods: {
    clickMe: function () {
      this.title = 'vue code click'
    },
  },
  mounted: function () {
    window.setTimeout(() => {
      this.title = 'timeout 1000'
    }, 1000)
  },
})
*/
class Vue {
  /**
   * 构造函数，用于初始化组件实例。
   * @param {Object} options 组件配置项，包含数据(data)、方法(methods)、挂载元素(el)和挂载后回调(mounted)等。
   */
  constructor(options) {
    var self = this
    this.data = options.data // 初始化组件的数据
    this.methods = options.methods // 初始化组件的方法

    // 遍历data中的所有键，使用proxyKeys进行处理
    Object.keys(this.data).forEach(function (key) {
      self.proxyKeys(key) // [ ] 1
    })

    observe(this.data) // 对data进行观察者模式的监听 // [ ] 2
    new Compile(options.el, this) // 编译模板，将指令绑定到DOM上 // [ ] 3
    options.mounted.call(this) // 执行挂载后的回调函数
  }
  /**
   * 为当前对象代理指定的属性。
   * @param {string} key - 需要被代理的属性名。
   *
   * 此函数通过使用Object.defineProperty()方法，创建一个不可枚举、可配置的属性，
   * 该属性代理了对象内部的data属性的读取和写入。
   */
  proxyKeys(key) {
    var self = this
    // 使用Object.defineProperty动态定义属性，实现对data[key]的读取和写入的代理
    Object.defineProperty(this, key, {
      enumerable: false, // 设置属性不可枚举
      configurable: true, // 设置属性可配置
      // 定义属性的获取器，返回data[key]的值
      get: function () {
        return self.data[key]
      },
      // 定义属性的设置器，将新值赋给data[key]
      set: function (newVal) {
        self.data[key] = newVal
      },
    })
  }
}
