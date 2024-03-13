// 提纲: 参数; 属性; 作用域; 严格模式; 箭头函数;
参数 = () => {
  形参 = () => {
    const log = (x, y = 'World') => {
      console.log(x, y)
    }
    log('Hello')
    ;('Hello World')
    log('Hello', 'China')
    ;('Hello China')
    log('Hello', '')
    ;('Hello ')
  }
  // 形参()
  形参声明报错 = () => {
    ;`function foo(x = 5) {
      let x = 1
      const x = 2
    }`
  }
  // 形参声明报错()
  默认参数加解构 = () => {
    function foo({ x, y = 5 } = {}) {
      console.log(x, y, 'undefined 5')
    }
    foo()
  }
  // 默认参数加解构()
  默认参数不在尾部无法省略 = () => {
    function foo(x = 1, y) {
      return [x, y]
    }
    console.log(foo(), '[ 1, undefined ]')
    console.log(foo(2), '[ 2, undefined ]')
    ;`console.log(foo(,1), '报错')`
    console.log(foo(undefined, 1), '[ 1, 1 ]')
  }
  默认参数不在尾部无法省略()
}
// 参数()
属性 = () => {
  length属性 = () => {
    length获取 = () => {
      console.log(function (a) {}.length, '1')
      console.log(function (a = 5) {}.length, '0')
      console.log(function (a, b, c = 5) {}.length, '2')
    }
    // length获取()
    rest不计入length = () => {
      console.log(function (...args) {}.length, '0')
    }
    // rest不计入length()
    默认值后参数不计入length = () => {
      console.log(function (a = 0, b, c) {}.length, '0')
      console.log(function (a, b = 1, c) {}.length, '1')
    }
    默认值后参数不计入length()
  }
  // length属性()
  name属性 = () => {
    name获取 = () => {
      var f = function () {}
      console.log(f.name, 'es5="", es6="f"')
    }
    // name获取()
    具名函数name = () => {
      var bar = function bar() {}
      console.log(bar.name, 'bar')
    }
    // 具名函数name()
    实例name = () => {
      new Function().name
      console.log('anonymous', new Function().name)
    }
    // 实例name()
    bind函数name = () => {
      function foo() {}
      console.log(foo.bind({}).name, 'bound foo')
      console.log(function () {}.bind({}).name, 'bound')
    }
    bind函数name()
  }
  name属性()
}
// 属性()
作用域 = () => {
  参数默认值形成作用域 = () => {
    let x = 1
    function f(y = x) {
      let x = 2
      console.log(y, '1')
    }
    f()
  }
  参数默认值形成作用域()
}
// 作用域()
严格模式 = () => {
  默认值报错 = `function doSomething(a, b = a){
    'use strict'
  }`
  // eval(默认值报错)
  解构报错 = `function ({a,b}){
    'use strict'
  }`
  // eval(解构报错)
  扩展报错 = `function doSomething(...a){
    'use strict'
  }`
  // eval(扩展报错)
}
严格模式()
箭头函数 = () => {
  定义函数 = `
    var f = (v) => var
    等同于
    var f = function (v) {
      return v
    }
  `
  参数小于等于1 = `
    var f = () => 5
    等同于
    var f = function () {
      return 5
    }
  `
  代码块多于一条语句 = `
    var sum = (num1, num2){ return num1 + num2 }
  `
  返回对象 = `
  let getTempItem = id => ({id: id, name: 'Temp'})
  `
}
箭头函数()
