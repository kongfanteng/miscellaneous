// - 合并表记录 - 描述 - 提示 - 输入描述 - 输出描述 - 示例 - 代码 - 题解
/**
 * 合并表记录
 * @param {string[]} table
 * @example
 *
 * 描述：
 * 输入两个表的记录，合并成一个表，要求合并后的表按记录的键值升序排列。
 *
 * 提示：
 * 1 <= len(table1) <= 1000000000
 * 1 <= len(table2) <= 1000000000
 *
 * 输入描述：
 * table1: 表1的记录
 * table2: 表2的记录
 *
 * 输出描述：
 * 合并后的表
 *
 * 示例1：
 * 输入：['1 2', '3 4', '1 2', '3 4'];
 * 打印：['1 4', '3 8']
 *
 * 测试：
 * const table = ['1 2', '3 4', '1 2', '3 4'];
 * mergeTable(table) // ['1 4', '3 8']
 */
function mergeTable(table) {
  const map = new Map()
  while (table.length) {
    const [k, v] = table.shift().split(' ')
    const value = map.get(k) ? map.get(k) + parseInt(v) : parseInt(v)
    map.set(k, value)
  }
  map.forEach((v, k) => {
    console.log(k, v)
  })
}
const table = ['1 2', '3 4', '1 2', '3 4']
mergeTable(table)
