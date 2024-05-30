/**
 * 选择排序 selectionSort
 * @param {number[]} arr - 乱序数组
 * @desc
 * ```
 * 1.在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
 * 2.从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
 * 3.重复第二步，直到所有元素均排序完毕。
 * ```
 * @example
 * ```js
 * const arr = [3, 3, 4, 18, 1, 6, 8, 4]
 * console.log(selectionSort(arr)) // [ 1, 3, 3, 4, 4, 6, 8, 18 ]
 * ```
 */
const selectionSort = (arr) => {
  let minIndex
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      // 1.在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      // 2.从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
      ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    // 3.重复第二步，直到所有元素均排序完毕。
  }
  return arr
}
