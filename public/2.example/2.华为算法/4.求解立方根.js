/**
 * 求解立方根
 * 浮点数，一位小数
 * ;
 * 19.9
 * 2.7
 * ;
 * 2.7
 * 1.4
 * ;
 * 0-0.3
 */
function cubicRoot(a) {
  条件相减大于等于某数 = (a) => {
    const x = 0.00001
    let low = Math.min(-1, a)
    let hight = Math.max(1, a)
    let ans = (low + hight) / 2
    while (Math.abs(ans ** 3 - a) >= x) {
      if (ans ** 3 < a) {
        low = ans
      } else {
        hight = ans
      }
      ans = (low + hight) / 2
    }
    console.log(ans.toFixed(1))
  }
  条件相减大于等于某数(a)

  const b = (a) => {
    let num = a
    let res = 0
    let min = 0
    for (let i = -3; i < 3; i++) {
      min = i * i * i
      max = (i + 1) * (i + 1) * (i + 1)
      if (num >= min && num <= max) {
        min = i
        max = i + 1
        break
      }
    }
    let diff = 20
    while (min <= max) {
      if (Math.abs(num - min * min * min) < diff) {
        diff = num - min * min * min
        res = min * 1.0
      }
      min += 0.1
    }
    console.log(res.toFixed(1))
  }
  b(a)
}
cubicRoot(19.9)
