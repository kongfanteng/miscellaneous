class Observer {
  /**
   * 构造函数
   * @param {Object|Array} data - 初始化数据，可以是对象或数组。
   * @description 创建实例时，将数据传递给构造函数，并立即对其进行遍历处理。
   */
  constructor(data) {
    this.data = data
    this.walk(data) // 对初始化的数据进行遍历处理 // [ ] 2.1.1
  }
  /**
   * 遍历给定的数据对象，并为其每个属性设置响应式系统。
   * @param {Object} data 需要设置响应式系统的数据对象。
   */
  walk(data) {
    // 遍历data对象的所有键，为每个键所对应的属性设置响应式
    Object.keys(data).forEach(function (key) {
      defineReactive(data, key, data[key]) // [ ] 2.1.1.1
    })
  }
}

/**
 * 定义响应式对象的属性。
 * @param {Object} data 要响应化的对象。
 * @param {string} key 属性名。
 * @param {*} val 属性的初始值。
 * 此函数不返回任何内容。
 */
function defineReactive(data, key, val) {
  var dep = new Dep() // 创建一个依赖实例 defineReactive(data, key, data[key]) // [ ] 2.1.1.1.1

  // 通过Object.defineProperty设置data对象的key属性，使其具有响应式能力
  Object.defineProperty(data, key, {
    enumerable: true, // 可以在循环中遍历到该属性
    configurable: true, // 可以通过delete操作符删除该属性，或通过Object.defineProperty重新定义该属性
    // get函数用于获取属性值，当尝试访问该属性时触发
    get: function getter() {
      // [ ] 3.1.1.2.4.2.1.1.1
      // 如果存在Dep.target，则将当前getter绑定到Dep.target上，实现依赖收集
      if (Dep.target) {
        dep.addSub(Dep.target) // [ ] 2.1.1.1.2
      }
      return val // 返回属性的当前值
    },
    // set函数用于设置属性值，当尝试修改该属性时触发
    set: function setter(newVal) {
      // 如果新值与旧值相同，则不进行任何操作
      if (newVal === val) {
        return
      }
      val = newVal // 更新属性的值
      dep.notify() // 通知所有订阅者，属性值发生了变化 // [ ] 2.1.1.1.3
    },
  })
}

/**
 * 观察一个值是否需要被响应式处理。
 *
 * @param {any} value 需要被观察的值。如果此值不是对象或者为null，则不会进行观察。
 * @param {Object} vm 与这个值相关的虚拟机实例，此处未使用但保留以便于扩展。
 * @returns {Observer|undefined} 如果value是对象，则返回一个Observer实例；否则不返回任何内容。
 */
function observe(value, vm) {
  // 如果value不存在或不是对象类型，则直接返回undefined，不进行观察
  if (!value || typeof value !== 'object') {
    return
  }
  // 对象类型的价值被观察者包装
  return new Observer(value) // [ ] 2.1
}

class Dep {
  /**
   * 构造器函数
   * 用于创建一个新对象并初始化其属性。
   */
  constructor() {
    // 初始化一个空数组用于存储订阅
    this.subs = []
  }
  /**
   * 将一个订阅对象添加到订阅列表中。
   * @param {Array} sub - 需要被添加的订阅对象。
   */
  addSub(sub) {
    // 将新的订阅对象添加到订阅列表中
    this.subs.push(sub)
  }
  /**
   * 通知所有订阅者更新。
   * 此函数遍历订阅者列表，并调用每个订阅者的更新方法。
   *
   * 参数无。
   * 返回值无。
   */
  notify() {
    // 遍历订阅者列表并调用每个订阅者的 update 方法
    this.subs.forEach(function (sub) {
      sub.update() // [ ] 2.1.1.1.3.1
    })
  }
}
Dep.target = null
