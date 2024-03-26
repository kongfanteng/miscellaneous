
/**
 * 购物单
 * @param {*} sumNum 
 * @param  {...any} args 
 */
function shoppingList(sumNum, ...args) {
  // getContext; buy; setDp;
  // forListLen; forSum; dp[i][j];
  // 无附件; 1附件; 2附件;
  const getContext = (sumNum, ...args) => {
    let [base, list] = [10, {}]
    let [sum, num] = sumNum.split(' ').map(Number)
    sum = sum / base
    for (let i = 0; i < num; i++) {
      let [p, v, q] = args[i].split(' ').map(Number)
      p = p / base
      if (!q) {
        list[i + 1] = list[i + 1] || []
        list[i + 1][0] = [p, p * v]
      } else {
        list[q] = list[q] || []
        list[q][1] = list[q][1] || []
        list[q][1].push(p, p * v)
      }
    }
    list = [...Object.values(list)]
    return { list, base, sum }
  }
  const buy = (context) => {
    const { list, base, sum } = context
    const len = list.length
    const dp = Array.from({ length: len }, () => Array(sum + 1).fill(0))
    dp[-1] = Array(sum + 1).fill(0)
    for (let i = 0; i < len; i++) {
      for (let j = 1; j <= sum; j++) {
        setDp(i, j, dp, list)
      }
    }
    return dp[len - 1][sum] * base
  }
  const setDp = (index, money, dp, list) => {
    const goods = list[index]
    const mGoods = goods[0]
    const nGoods = goods[1]
    const [mGoodsP, mGoodsW] = mGoods
    if (money < mGoodsP) {
      dp[index][money] = dp[index - 1][money]
    } else {
      dp[index][money] = Math.max(
        dp[index - 1][money],
        dp[index - 1][money - mGoodsP] + mGoodsW
      )
      nGoods && setDpMinor(nGoods, dp, mGoods, money, index)
    }
  }
  const setDpMinor = (nGoods, dp, mGoods, money, index) => {
    const [mGoodsP, mGoodsW] = mGoods
    const [nGoodsP1, nGoodsW1, nGoodsP2, nGoodsW2] = nGoods
    money >= mGoodsP + nGoodsP1 &&
      (dp[index][money] = Math.max(
        dp[index][money],
        dp[index - 1][money - mGoodsP - nGoodsP1] + mGoodsW + nGoodsW1
      ))
    money >= mGoodsP + nGoodsP2 &&
      (dp[index][money] = Math.max(
        dp[index][money],
        dp[index - 1][money - mGoodsP - nGoodsP2] + mGoodsW + nGoodsW2
      ))
    money >= mGoodsP + nGoodsP1 + nGoodsP2 &&
      (dp[index][money] = Math.max(
        dp[index][money],
        dp[index - 1][money - mGoodsP - nGoodsP1 - nGoodsP2] +
          mGoodsW +
          nGoodsW1 +
          nGoodsW2
      ))
  }
  const context = getContext(sumNum, ...args)
  const res = buy(context)
  console.log(res)
}
function shoppingList优化1(sumNum, ...args) {
  
}

shoppingList('1000 5', '800 2 0', '400 5 1', '300 5 1', '400 3 0', '500 2 0')
