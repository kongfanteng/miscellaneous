/**
 * 名字漂亮度
 * @example
 *
 * 小写字母；总合；1-26；
 * 2
 * zhangsan
 * lisi
 * 输出
 * 192
 * 101
 * 分析
 * ；26*2+25*2+24*1+23*1+22*1+21*1=192
 * ；26*2+25*2+24*1=101
 * 贪心
 *
 */
function namePretty(n, ...args) {
  const Array26CharCodeAt97 = (n, ...args) => {
    console.log(args);
    for (let i = 0; i < n; i++) {
      let sum = 0
      const nameArr = args[i].toLowerCase().split('')
      let caseArr = Array(26).fill(0)
      nameArr.forEach((item) => {
        caseArr[item.charCodeAt() - 97]++
      })
      caseArr = caseArr.sort((a, b) => b - a).filter((item) => item > 0)
      caseArr.forEach((item, key) => {
        sum += item * (26 - key)
      })
      console.log(sum)
    }
  }
  // Array26CharCodeAt97(n, ...args)
  const objectValues = (n, ...args) => {
    for (let i = 0; i < n; i++) {
      let sum = 0
      let obj = {}
      let charArr = args[i].toLowerCase().split('')
      for (let j = 0; j < charArr.length; j++) {
        obj[charArr[j]] = obj[charArr[j]] ? obj[charArr[j]] + 1 : 1
      }
      const sumArr = Object.values(obj).sort((a, b) => b - a)
      sumArr.forEach((v, k) => {
        sum += v * (26 - k)
      })
      console.log(sum)
    }
  }
  objectValues(n, ...args)
}
namePretty(2, 'lisi', 'zhangsan')
