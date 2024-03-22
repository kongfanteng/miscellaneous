/**
 * 质数因子
 */

//质数因子：首先要知道什么叫质数因子了，任何大于1的数都能被拆分成若干个质数的乘积，另外X的质因子一定小于等于根号X，即质因子的范围为2到√X
//另外还有个特殊情况，就是输入的这个数，本身就是质数，但还要排除1这个数。

/**
 * 质数因子
 */
function ziShuFactor(num) {
  // 1. 任意大于1的数为质数乘积
  // 2. X质因子小于X的开根号
  // 3. X本身为质数
  let factors = []
  for (let i = 2; i <= Math.sqrt(num); i++) {
    while (num % i === 0) {
      factors.push(i)
      num /= i
    }
  }
  if (num !== 1) {
    factors.push(num)
  }
  console.log(factors)
}
ziShuFactor(180)
