/**
 * 购物单
 * 动态规划
 */
function shoppingList(sumAndNum, ...args) {
  let base = 10
  let [sum, num] = sumAndNum.split(' ').map(Number)
  sum = sum / base
  let list = {}
  for (let i = 0; i < num; i++) {
    let [v, p, q] = args[i].split(' ').map(Number)
    v = v / base
    if (q) {
      list[q] = list[q] || []
      list[q][1] = list[q][1] || []
      list[q][1].push(v, v * p)
    } else {
      list[i + 1] = list[i + 1] || []
      list[i + 1][0] = [v, v * p]
    }
  }
  list = [...Object.values(list)]
  // console.log(list)
  let len = list.length
  let dp = Array.from({ length: len }, () => new Array(sum + 1).fill(0))
  dp[-1] = new Array(sum + 1).fill(0)
  for (let i = 0; i < len; i++) {
    for (let j = 1; j <= sum; j++) {
      const goods = list[i] // [[80, 160]]
      const mainGoods = goods[0] // [80, 160]
      const mainGoodsPrice = mainGoods[0]
      const mainGoodsWeight = mainGoods[1]
      const minorGoods = goods[1] // [40, 200, 30, 150]
      if (j < mainGoodsPrice) {
        dp[i][j] = dp[i - 1][j]
      } else {
        let minorGoodsPrice1,
          minorGoodsPrice2,
          minorGoodsWeight1,
          minorGoodsWeight2
        minorGoods &&
          ((minorGoodsPrice1 = minorGoods[0]),
          (minorGoodsWeight1 = minorGoods[1]),
          (minorGoodsPrice2 = minorGoods[2]),
          (minorGoodsWeight2 = minorGoods[3]))
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - mainGoodsPrice] + mainGoodsWeight
        )
        j >= mainGoodsPrice + minorGoodsPrice1 &&
          (dp[i][j] = Math.max(
            dp[i][j],
            dp[i - 1][j - mainGoodsPrice - minorGoodsPrice1] +
              mainGoodsWeight +
              minorGoodsWeight1
          ))
        j >= mainGoodsPrice + minorGoodsPrice2 &&
          (dp[i][j] = Math.max(
            dp[i][j],
            dp[i - 1][j - mainGoodsPrice - minorGoodsPrice2] +
              mainGoodsWeight +
              minorGoodsWeight2
          ))
        j >= mainGoodsPrice + minorGoodsPrice1 + minorGoodsPrice2 &&
          (dp[i][j] = Math.max(
            dp[i][j],
            dp[i - 1][
              j - mainGoodsPrice - minorGoodsPrice1 - minorGoodsPrice2
            ] +
              mainGoodsWeight +
              minorGoodsWeight1 +
              minorGoodsWeight2
          ))
      }
    }
  }
  console.log(dp[len - 1][sum] * base)
}
shoppingList2('1000 5', '800 2 0', '400 5 1', '300 5 1', '400 3 0', '500 2 0')
// shoppingList('50 5', '20 3 5', '20 3 5', '10 3 0', '10 2 0', '10 1 0')
function shoppingList2(sumNum, ...args) {
  // list; forListLen; forSum; dp[i][j]; 无附件; 1附件; 2附件;
  const getContext = (sumNum, args) => {
    const base = 10
    let list = {}
    let [sum, num] = sumNum.split(' ').map(Number)
    sum = sum / base
    for (let i = 0; i < num; i++) {
      let [price, w, attachment] = args[i].split(' ').map(Number)
      price = price / base
      if (attachment) {
        list[attachment] = list[attachment] || []
        list[attachment][1] = list[attachment][1] || []
        list[attachment][1].push(price, price * w)
      } else {
        list[i + 1] = list[i + 1] || []
        list[i + 1][0] = [price, price * w]
      }
    }
    return {
      list: [...Object.values(list)],
      base,
      sum,
      num,
    }
  }
  const context = getContext(sumNum, args)
  const buy = (context) => {
    const { list, base, sum, num } = context
    const len = list.length
    const dp = Array.from({ length: len }, () => Array(sum + 1).fill(0))
    dp[-1] = Array(sum + 1).fill(0)
    for (let i = 0; i < len; i++) {
      for (let j = 1; j <= sum; j++) {
        setDp(i, j, dp, list)
      }
    }
    const res = dp[len - 1][sum] * base
    console.log(res)
  }
  const setDp = (i, j, dp, list) => {
    const goods = list[i] // [[80, 160]]
    const mainGoods = goods[0] // [80, 160]
    const mainGoodsPrice = mainGoods[0]
    const mainGoodsWeight = mainGoods[1]
    const minorGoods = goods[1] // [40, 200, 30, 150]
    if (j < mainGoodsPrice) {
      dp[i][j] = dp[i - 1][j]
    } else {
      let minorGoodsPrice1,
        minorGoodsPrice2,
        minorGoodsWeight1,
        minorGoodsWeight2
      minorGoods &&
        ((minorGoodsPrice1 = minorGoods[0]),
        (minorGoodsWeight1 = minorGoods[1]),
        (minorGoodsPrice2 = minorGoods[2]),
        (minorGoodsWeight2 = minorGoods[3]))
      dp[i][j] = Math.max(
        dp[i - 1][j],
        dp[i - 1][j - mainGoodsPrice] + mainGoodsWeight
      )
      j >= mainGoodsPrice + minorGoodsPrice1 &&
        (dp[i][j] = Math.max(
          dp[i][j],
          dp[i - 1][j - mainGoodsPrice - minorGoodsPrice1] +
            mainGoodsWeight +
            minorGoodsWeight1
        ))
      j >= mainGoodsPrice + minorGoodsPrice2 &&
        (dp[i][j] = Math.max(
          dp[i][j],
          dp[i - 1][j - mainGoodsPrice - minorGoodsPrice2] +
            mainGoodsWeight +
            minorGoodsWeight2
        ))
      j >= mainGoodsPrice + minorGoodsPrice1 + minorGoodsPrice2 &&
        (dp[i][j] = Math.max(
          dp[i][j],
          dp[i - 1][j - mainGoodsPrice - minorGoodsPrice1 - minorGoodsPrice2] +
            mainGoodsWeight +
            minorGoodsWeight1 +
            minorGoodsWeight2
        ))
    }
  }
  buy(context)
}
