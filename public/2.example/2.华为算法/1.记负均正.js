/**
 * 记负均正
 * @example
 * n, 整数，负数，平均值，一位小数
 * n = 11
 * str = `1 2 3 4 5 6 7 8 9 0 -1`
 * console.log(1, `5.0`)
 * split, filter, < 0, reduce, /, toFixed
 */
function negativePositive(n, str) {
  // filterReduce; forEach; forOf;
  filterReduce = (n, str) => {
    const arr = str.split(' ').map(Number)
    let negativeNum = 0
    const activeArr = arr.filter((item) => {
      if (item < 0) negativeNum = negativeNum + 1
      return item > 0
    })
    const activeLen = activeArr.length
    const activeSum = activeArr.reduce((pre, cur) => pre + cur, 0)
    const activeAvg = activeLen > 0 ? (activeSum / activeLen).toFixed(1) : `0.0`
    console.log(negativeNum, activeAvg)
  }
  // filterReduce(n, str)
  forEach = (n, str) => {
    const arr = str.split(' ').map(Number)
    let negativeNum = 0
    let activeSum = 0
    let activeLen = 0
    arr.forEach((item) => {
      if (item < 0) negativeNum = negativeNum + 1
      if (item > 0) {
        activeSum = activeSum + item
        activeLen = activeLen + 1
      }
    })
    const activeAvg = activeLen > 0 ? (activeSum / activeLen).toFixed(1) : `0.0`
    console.log(negativeNum, activeAvg)
  }
  // forEach(n, str)
  forOf = (n, str) => {
    const arr = str.split(' ').map(Number)
    let negativeNum = 0
    let activeSum = 0
    let activeLen = 0
    for (let item of arr) {
      if (item < 0) negativeNum = negativeNum + 1
      if (item > 0) {
        activeSum = activeSum + item
        activeLen = activeLen + 1
      }
    }
    const activeAvg = activeLen > 0 ? (activeSum / activeLen).toFixed(1) : `0.0`
    console.log(negativeNum, activeAvg)
  }
  forOf(n, str)
}
negativePositive(11, '1 2 3 4 5 6 7 8 9 0 -1')
