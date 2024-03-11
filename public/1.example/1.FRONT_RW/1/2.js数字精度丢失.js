// 提纲：浮点数；问题分析；解决方案；
浮点数 = () => {
  console.log(`
  js 存储方式是双精度浮点数
  `)
}
问题分析 = () => {
  问题 = () => {
    console.log(0.1 + 0.2 === 0.3, 'false')
  }
  精度运算 = () => {
    console.log((0.100000000000000000055).toPrecision(16), '0.1000000000000000')
  }
  精度运算()
}
解决方案 = () => {
  凑整 = () => {
    console.log(parseFloat((1.40000000000001).toPrecision(12)) === 1.4, 'true')
  }
  凑整封装 = () => {
    function strip(num, precision = 12) {
      return +parseFloat(num.toPrecision(precision))
    }
    console.log(strip(1.40000000000001) === 1.4, 'true')
  }
  运算类转整数 = () => {
    function add(num1, num2) {
      const num1Digits = (num1.toString().split('.')[1] || '').length
      const num2Digits = (num2.toString().split('.')[1] || '').length
      const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits))
      return (num1 * baseNum + num2 * baseNum) / baseNum
    }
    console.log(add(0.1, 0.2), '0.3')
  }
  运算类转整数()
}
解决方案()
