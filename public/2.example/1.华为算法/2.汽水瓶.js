/**
 * 汽水瓶
 *
 * @example
 *
 * 测试：
 * qishuiping([0, 10, 81])
 */
function qishuiping(line) {
  const 方法1 = () => {
    line.forEach((l) => {
      let sum = 0
      while (l >= 3) {
        const value = Math.floor(l / 3)
        sum += value
        l = value + (l % 3)
      }
      if (l === 2) {
        sum += 1
      }
      if (sum !== 0) {
        console.log(sum, '3 换 1')
      }
    })
  }
  // 方法1()
  const 方法2 = () => {
    line.forEach((l) => {
      const res = parseInt(l / 2)
      res !== 0 && console.log(res, '2换1')
    })
  }
  方法2()
}
qishuiping([0, 10, 81])
