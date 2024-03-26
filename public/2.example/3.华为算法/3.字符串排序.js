/**
 * 字符串排序
 * @param {string} str
 * @return {string}
 * @example
 * sortStrings('bob ccc aaa bbb') => "aaa bbb bob ccc"
 */

function sortStrings(str) {
  // 两层循环；桶排序。
  // 两层循环：26外循环，strLength内循环，charCodeAt比较；splice插入非字母。
  const 两层循环 = (str) => {
    let arr = str.split('')
    const len = arr.length
    const sorted = []
    for (let i = 0; i < 26; i++) {
      for (let j = 0; j < len; j++) {
        if (arr[j].charCodeAt() === 65 + i || arr[j].charCodeAt() === 97 + i) {
          sorted.push(arr[j])
        }
      }
    }
    for (let i = 0; i < len; i++) {
      if (!/[a-zA-Z]/.test(arr[i])) {
        sorted.splice(i, 0, arr[i])
      }
    }
    console.log(sorted.join(''))
  }
  // 两层循环(str)
  const 桶排序 = (str) => {
    // 26空数组；forof；charCodeAt+=s；splice；
    const arr = str.split('')
    const len = arr.length
    const bucket = new Array(26).fill('')
    for (const s of str) {
      if (/[a-z]/.test(s)) {
        bucket[s.charCodeAt() - 'a'.charCodeAt()] += s
      } else if (/[A-Z]/.test(s)) {
        bucket[s.charCodeAt() - 'A'.charCodeAt()] += s
      }
    }
    const sorted = bucket.join('').split('')
    for (let i = 0; i < len; i++) {
      if (!/[a-zA-Z]/.test(arr[i])) {
        sorted.splice(i, 0, arr[i])
      }
    }
    console.log(sorted.join(''))
  }
  桶排序(str)
}
sortStrings('bob ccc aaa bbb')
