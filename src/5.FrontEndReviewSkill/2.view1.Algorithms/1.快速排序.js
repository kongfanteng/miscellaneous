/**
 * @desc
 * ```
 * 1.先从数列中取出一个数作为“基准”。
 * 2.分区过程：将比这个“基准”大的数全放到“基准”的右边，小于或等于“基准”的数全放到“基准”的左边。
 * 3.再对左右区间重复第二步，直到各区间只有一个数。
 * ```
 * @example
 * ```js
 * const arr = [1, 10, 3, 4, 5, 6, 7, 8]
 * console.log(quickSort(arr)) // [ 1, 3, 4, 5, 6, 7, 8, 10 ]
 * ```
 */
const quickSort = (arr) => {
  // 3.再对左右区间重复第二步，直到各区间只有一个数。
  if (arr.length <= 1) {
    return arr
  }
  // 1.先从数列中取出一个数作为“基准”。
  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr.splice(pivotIndex, 1)[0]
  // 2.分区过程：将比这个“基准”大的数全放到“基准”的右边，小于或等于“基准”的数全放到“基准”的左边。
  const [left, right] = [[], []]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}
