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
  Array.prototype[Symbol.iterator] = function () {
    let arr = [].concat(this)
    const getFirst = (array) => {
      let first = array.shift()
      if (first instanceof Array) {
        if (first.length > 1) {
          arr = first.slice(1).concat(array)
        }
        first = first[0]
      }
      return first
    }
    return {
      next: () => {
        const first = getFirst(arr)
        if (first) {
          return {
            value: first,
            done: false,
          }
        } else {
          return {
            done: true,
          }
        }
      },
    }
  }
  const res = []
  for (const item of arr) {
    res.push(item)
  }
  return res.join(',')
}
const arr = ['a', ['b', 'c'], 2, ['d', 'e', 'f'], 'g', 3, 4]
const res = flat(arr)
console.log('res:', res)
