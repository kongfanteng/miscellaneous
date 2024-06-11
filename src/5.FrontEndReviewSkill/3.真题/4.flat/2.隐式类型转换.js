/**
 * 
 * @example
 * ```js
  const arr = ['a', ['b', 'c'], 2, ['d', 'e', 'f'], 'g', 3, 4]
  const res = flat(arr)
  console.log('res:', res)
 * ```
 */
const flat = (arr) => {
  const toString = (arr) => {
    let oldToString = Array.prototype.toString
    Array.prototype.toString = function () {
      return this.join(',')
    }
    const res = arr + ''
    Array.prototype.toString = oldToString
    return res
  }
  const useValueOf = (arr) => {
    let oldValueOf = Array.prototype.valueOf
    Array.prototype.valueOf = function () {
      return this.join(',')
    }
    const res = arr + ''
    Array.prototype.valueOf = oldValueOf
    return res
  }
  return useValueOf(arr)
}
const arr = ['a', ['b', 'c'], 2, ['d', 'e', 'f'], 'g', 3, 4]
const res = flat(arr)
console.log('res:', res)
