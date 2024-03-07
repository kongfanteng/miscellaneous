/**
 * 节流
 * 
 * @example
 *
 *  const fn = () => { console.log('123') }
 *  const resFn = throttled1(fn, 1000)
 *  resFn()
 *  setTimeout(() => {
      resFn()
    }, 2000)
 */
function throttled1(fn, delay = 500) {
  let oldTime = Date.now()
  return function (...args) {
    let newTime = Date.now()
    console.log('newTime - oldTime:', newTime - oldTime)
    if (newTime - oldTime > delay) {
      fn.apply(null, args)
      oldTime = Date.now()
    }
  }
}
/**
 * 节流
 * @example
 *
 * const fn = () => { console.log('123') }
 * const resFn = throttled2(fn, 1000)
 * resFn()
 * resFn()
 * resFn()
 * setTimeout(() => {
 *   resFn()
 * }, 2000)
 *
 * @param {Function} fn - 函数
 * @param {number} delay - 间隔时间，毫秒
 * @returns {Function}
 */
function throttled2(fn, delay = 500) {
  let timer = null
  return function (...args) {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

/**
 * 节流
 * @desc 结合时间戳写法与定时器写法
 * @example
 *
 * const fn = () => { console.log('123') }
 * const resFn = throttled(fn, 1000)
 * resFn()
 * resFn()
 * resFn()
 * setTimeout(() => {
 *   resFn()
 * }, 2000)
 *
 */
function throttled(fn, delay = 500) {
  let timer = null
  let starttime = Date.now()
  return function () {
    let curTime = Date.now()
    let remaining = delay - (curTime - starttime)
    let context = this
    let args = arguments
    clearTimeout(timer)
    if (remaining <= 0) {
      fn.apply(context, args)
    } else {
      timer = setTimeout(fn, remaining)
    }
  }
}
/**
 * 防抖
 * @param {Function} fn - 函数
 * @param {number|undefined} wait - 间隔时间，毫秒，默认 500
 * @example
 *
 * const fn = (res) => { console.log(res) }
 * const resFn = debounce(fn, 1000)
 * resFn(1)
 * resFn(2)
 * resFn(3) // 打印 3
 *
 */
function debounce(fn, wait = 500) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      fn.apply(context, args)
    }, wait)
  }
}

/**
 *
 * @param {Function} fn - 函数
 * @param {?number} wait - 间隔时间，毫秒；默认 500
 * @param {?boolean} immediate - 是否立即执行；默认 false
 * @returns {Function}
 *
 * @desc
 * @example
 *
 * CODE_PROCESS：
 * 1. 定义 timeout 表示定时器的引用；
 * 2. 返回一个函数
 * 2.1 定义 context 表示 this 的引用；
 * 2.2 定义 args 表示 arguments 的引用；
 * 2.3 如果 timeout 存在，则清除定时器；
 * 2.4 如果 immediate 为 true，则立即执行 fn 函数；
 * 2.4.1 定义一个变量 callNow，用来判断是否立即执行 fn 函数；赋值为 timeout 不存在；
 * 2.4.2 定义 timeout，用来在 wait 毫秒后清除定时器；
 * 2.4.3 如果 callNow 为 true，则执行 fn 函数；
 * 2.5 如果 immediate 为 false，则在 wait 毫秒后执行 fn 函数；
 *
 * TEST:
 * const fn = (res) => { console.log(res) }
 * const resFn = debounce2(fn, 1000, true)
 * resFn(1)
 * resFn(2)
 * resFn(3) // 1
 *
 */
function debounce2(fn, wait = 500, immediate = false) {
  // 1. 定义 timeout 表示定时器的引用；
  let timeout
  // 2. 返回一个函数
  return function () {
    // 2.1 定义 context 表示 this 的引用；
    let context = this
    // 2.2 定义 args 表示 arguments 的引用；
    let args = arguments
    // 2.3 如果 timeout 存在，则清除定时器；
    if (timeout) clearTimeout(timeout)
    // 2.4 如果 immediate 为 true，则立即执行 fn 函数；
    if (immediate) {
      // 2.4.1 定义一个变量 callNow，用来判断是否立即执行 fn 函数；赋值为 timeout 不存在；
      let callNow = !timeout
      // 2.4.2 定义 timeout，用来在 wait 毫秒后清除定时器；
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      // 2.4.3 如果 callNow 为 true，则执行 fn 函数；
      if (callNow) {
        fn.apply(context, args)
      }
    } else {
      // 2.5 如果 immediate 为 false，则在 wait 毫秒后执行 fn 函数；
      timeout = setTimeout(function () {
        fn.apply(context, args)
      }, wait)
    }
  }
}
