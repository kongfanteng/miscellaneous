const flat = (arr) => {
  const res = []
  const each = (array) => {
    array.forEach((item) => {
      if (item instanceof Array) {
        each(item)
      } else {
        res.push(item)
      }
    })
  }
  each(arr)
  return res.join(',')
}

const arr = ['a', ['b', 'c'], 2, ['d', 'e', 'f'], 'g', 3, 4]
const res = flat(arr)
console.log('res:', res)
