function 纯函数() {
  let double = (value) => value * 2
  // 可测试
  test('double(2) 等于 4', () => {
    expect(double(2)).toBe(4)
  })
}
function 高阶函数() {
  const forEach = function (arr, fn) {
    for (let i = 0; i < arr.length; i++) {
      fn(arr[i])
    }
  }
  let arr = [1, 2, 3]
  forEach(arr, (item) => {
    // console.log(item)
  })
  const once = (fn) => {
    let done = false
    return function () {
      if (!done) {
        fn.apply(this, fn)
      } else {
        console.log('该函数已经执行')
      }
      done = true
    }
  }
  let fn = once(() => {})
  fn()
  fn()
  fn()
}
function 柯里化() {
  let fn = (x, y) => x + y
  const curry = (fn) => {
    return function (x) {
      return function (y) {
        return fn(x, y)
      }
    }
  }
  let myFn = curry(fn)
  console.log(myFn(1)(2))
}
function 多参数柯里化() {
  const curry = (fn) => {
    return function curriedFn(...args) {
      if (args.length < fn.length) {
        return function () {
          return curriedFn(...args.concat([...arguments]))
        }
      }
      return fn(...args)
    }
  }
  const fn = (x, y, z, a) => x + y + z + a
  const myFn = curry(fn)
  console.log(myFn(1)(2)(3)(1))
}
function 组合与管道() {
  // 组合执行：右到左；管道执行：左到右；
  const afn = (a) => a + 2
  const bfn = (b) => b * 3
  function 组合() {
    const 组合原理 = () => {
      const compose = (a, b) => (c) => a(b(c))
      const myfn = compose(afn, bfn)
      console.log(myfn(2))
    }
    const 组合实现 = () => {
      const compose =
        (...fns) =>
        (val) =>
          fns.reverse().reduce((acc, fn) => fn(acc), val)
      console.log('compose:', compose(afn, bfn)(2))
    }
    组合实现()
  }
  function 管道() {
    const pipe =
      (...fns) =>
      (val) =>
        fns.reduce((acc, fn) => fn(acc), val)
    console.log('pipe(afn, bfn)(2):', pipe(afn, bfn)(2))
  }
  管道()
}
function 函数式编程优缺点() {
  const 优点 = `
  1. 无状态或少状态；最大化减少未知错误；
  2. 简单复用；不用考虑内部实现和外部影响；
  3. 更强大的组合性；
  4. 减少代码量；
  `
  const 缺点 = `
  1. 性能较指令式编程略差；因为过度包装；
  2. 占用资源；为了实现对象状态不可变会去创建新对象；
  3. 递归陷阱；为了迭代，通常会使用递归；
  `
  console.log(缺点)
}
函数式编程优缺点()
