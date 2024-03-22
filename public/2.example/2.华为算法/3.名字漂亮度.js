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
    console.log(args)
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
// namePretty(2, 'lisi', 'zhangsan')

const 贪心算法 = () => {
  function greedyLoad(capacity, items) {
    let loaded = 0
    const loadedItems = []
    items.sort((a, b) => b.value - a.value) // 按单位价值排序物品
    for (let i = 0; i < items.length; i++) {
      if (loaded + items[i].weight <= capacity) {
        loaded += items[i].weight
        loadedItems.push(items[i])
      }
    }
    return loadedItems
  }

  // 使用示例
  const capacity = 10
  const items = [
    { name: 'item1', weight: 4, value: 4 },
    { name: 'item2', weight: 3, value: 6 },
    { name: 'item3', weight: 5, value: 5 },
  ]

  const loadedItems = greedyLoad(capacity, items)
  console.log(loadedItems) // 输出装载的物品，每一步做出最优解
}
贪心算法()
