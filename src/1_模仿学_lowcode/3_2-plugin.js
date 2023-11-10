/**
 * 所有插件都会在插件底座注册后，将插件注册到插件集中
 * 开发者只需考虑插件在插件集注册方式即可
 * 插件化设计主要涉及两块内容
 * 1. 插件底座
 * 2. 插件的注册方式
 * 3. 调用插件
 */
class Calculator {
  plugins = [] // 插件集
  contructor() {}
  /**
   *
   * @param {{name: string, fn: Function}} plugin
   */
  use(plugin) {
    this.plugins.push(plugin)
    this[plugin.name] = plugin.fn
  }
}

const AddPlguin = {
  name: 'add',
  fn(a, b) {
    return a + b
  },
}

const MinusPlguin = {
  name: 'minus',
  fn(a, b) {
    return a - b
  },
}

const calculator = new Calculator()
calculator.use(AddPlguin)
calculator.use(MinusPlguin)

console.log('calculator.add(1, 2):', calculator.add(1, 2))
console.log('calculator.minus(1, 2):', calculator.minus(1, 2))
