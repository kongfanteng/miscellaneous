/**
 * 购物单
 * @param {*} sumNum
 * @param  {...any} args
 */
function shoppingList(sumNum, ...args) {
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
  const 基础比较顺序 = (sumNum, ...args) => {
    // 无附件：Math.max(dp[i-1][...], ...)
    // 放附件：Math.max(dp[i][...], ...)
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
  // 基础比较顺序(sumNum, ...args)
  dp使用一维数组 = (sumNum, ...args) => {
    // 逆序迭代
    // 无附件：Math.max(dp[j], dp[j-v]+w)
    // 有附件：Math.max(dp[j], dp[j-...]+...)
    const buy = (context) => {
      const { list, sum, base } = context
      const len = list.length
      const dp = Array(sum + 1).fill(0)
      for (let i = 0; i < len; i++) {
        for (let j = sum; j; j--) {
          const [v, w] = list[i][0]
          if (j >= v) {
            dp[j] = Math.max(dp[j], dp[j - v] + w)
            const [v1, w1, v2, w2] = list[i][1] || []
            j >= v + v1 && (dp[j] = Math.max(dp[j], dp[j - v - v1] + w + w1))
            j >= v + v2 && (dp[j] = Math.max(dp[j], dp[j - v - v2] + w + w2))
            j >= v + v1 + v2 &&
              (dp[j] = Math.max(dp[j], dp[j - v - v1] + w + w1 + w2))
          }
        }
      }
      const res = dp[sum] * base
      return res
    }
    const context = getContext(sumNum, ...args)
    const res = buy(context)
    console.log(res)
  }
  dp使用一维数组(sumNum, ...args)
  const 主附件组合 = (sumNum, ...args) => {
    // 逆序迭代, 主附件组合
    // Math.max(dp[j], dp[j - w[s]] + v[s])
    const getContext = (sumNum, ...args) => {
      const [base, list] = [10, {}]
      const [sum, num] = sumNum.split(' ').map(Number)
      for (let i = 1; i <= num; i++) {
        const [v, p, q] = args[i - 1].split(' ').map(Number)
        if (q) {
          list[q] = list[q] || []
          list[q].push([v / 10, (v / 10) * p])
        } else {
          list[i] = list[i] || []
          list[i].unshift([v / 10, (v / 10) * p])
        }
      }
      return {
        list: [...Object.values(list)],
        sum: sum / base,
        base,
      }
    }
    const buy = (context) => {
      const { list, sum, base } = context
      let dp = Array(sum + 1).fill(0)
      list.forEach((e) => {
        const [ws, vs] = [[], []]
        const [[w, v], ...s] = e
        ws.push(w)
        vs.push(v)
        if (s[0]) {
          const [s1, s2] = s
          ws.push(s1[0] + w)
          vs.push(s1[1] + v)
          if (s2) {
            ws.push(s2[0] + w)
            vs.push(s2[1] + v)
            ws.push(s1[0] + s2[0] + w)
            vs.push(s1[1] + s2[1] + v)
          }
        }
        for (let j = sum; j; j--) {
          for (let s = 0; s < ws.length; s++) {
            if (j >= ws[s]) {
              dp[j] = Math.max(dp[j], dp[j - ws[s]] + vs[s])
            }
          }
        }
      })
      return dp[sum] * base
    }
    const context = getContext(sumNum, ...args)
    const res = buy(context)
    console.log(res)
  }
  主附件组合(sumNum, ...args)
}

shoppingList('1000 5', '800 2 0', '400 5 1', '300 5 1', '400 3 0', '500 2 0')
