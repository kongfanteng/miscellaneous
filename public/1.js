const memoize = function (func, content) {
  let cache = Object.create(null)
  content = content || this
  return (...key) => {
    if (!cache[key]) {
      cache[key] = func.apply(content, key)
    }
    return cache[key]
  }
}
function add(a, b) {
  return a + b
}
const calc = memoize(add)
const num1 = calc(100, 200)
console.log('num1:', num1)
const num2 = calc(100, 200)
console.log('num2:', num2)
