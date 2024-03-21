/**
 * 字符串字符配置
 *
 */
function stringMatch(a, b) {
  一键值对 = (a, b) => {
    const obj = {}
    let boo = true
    for (let i in b) {
      if (!obj[b[i]]) obj[b[i]] = 1
    }
    for (let j in a) {
      if (!obj[a[j]]) boo = false
    }
    console.log(boo)
  }
  // 一键值对(a,b)
  二ArrayEvery = (a, b) => {
    a = a.split('')
    b = b.split('')
    let boo = true
    a.every((item) => {
      if (!b.includes(item)) boo = false
    })
    console.log(boo)
  }
  // 二ArrayEvery(a, b)
  三26个字母 = (a, b) => {
    // ArrayFill, 97
    let boo = true
    const arr = Array(26).fill(0)
    b.split('').forEach((item) => {
      arr[item.charCodeAt() - 97] = 1
    })
    a.split('').forEach((item) => {
      if (!arr[item.charCodeAt() - 97]) boo = false
    })
    console.log(boo)
  }
  三26个字母(a, b)
  四数组加字符串 = (a, b) => {
    // sum, shortArr, longStr, includes, forof
    const shortArr = a.split('')
    const longStr = b
    let sum = 0
    for (const s of shortArr) {
      if (longStr.includes(s)) sum++
    }
    const boo = sum === shortArr.length
    console.log(boo)
  }
  四数组加字符串(a, b)
}
stringMatch('ab', 'abc')
