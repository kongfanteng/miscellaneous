class Watcher {
  /**
   * 构造函数，用于创建一个订阅者实例。
   * @param {Object} vm 上下文对象，通常是Vue实例。
   * @param {String} exp 表达式，用于在vm上下文中计算。
   * @param {Function} cb 订阅更新时的回调函数。
   */
  constructor(vm, exp, cb) {
    this.cb = cb // 订阅更新时的回调函数
    this.vm = vm // 上下文对象
    this.exp = exp // 表达式
    this.value = this.get() // 初始化时获取表达式的值，并将自己添加到订阅器的操作 // [ ] 3.1.1.2.4.2.1
  }
  /**
   * 更新函数，执行当前实例的运行方法。
   * 无参数。
   * 无返回值。
   */
  update() {
    this.run()
  }
  /**
   * 执行函数，用于检查和更新一个表达式的值，并在值变化时调用回调函数。
   * - 该函数不接受参数。
   * - 该函数没有返回值。
   */
  run() {
    // 获取当前虚拟机实例中指定表达式的值
    var value = this.vm.data[this.exp]
    // 获取之前的值，用于比较是否有变化
    var oldVal = this.value
    // 如果新值和旧值不相等，则更新旧值为新值，并调用回调函数
    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal) // 调用回调函数，传入新旧值
    }
  }
  /**
   * 获取绑定表达式的值
   * 此方法会首先将当前实例缓存为Dep的目标，然后从对应的Vue实例的data对象中根据表达式获取值，
   * 最后重置Dep的目标为null。这个过程涉及到依赖收集，确保了数据变化时能够通知到相关的监听器。
   *
   * @returns {any} 返回表达式对应的值。
   */
  get() {
    Dep.target = this // 缓存当前实例为Dep的目标，用于依赖收集
    // [ ] 3.1.1.2.4.2.1.1
    var value = this.vm.data[this.exp] // 从Vue实例的data中根据表达式获取值，会触发依赖收集
    Dep.target = null // 重置Dep的目标为null，结束依赖收集
    return value // 返回获取到的值
  }
}
