/**
 * 希尔排序 shellSort 递减增量排序算法
 * @param {number[]} arr
 * @desc
 * ```
 * 希尔排序的思想是：先将整个待排序的记录序列分割成
 * 若干子序列分别进行直接插入排序，待这个序列中的记
 * 录基本有序时，再对全体记录进行依次直接插入排序
 *
 * 1.选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1；
 * 2.按增量序列个数 k，对序列进行 k 趟排序；
 * 3.每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。
 * ```
 * @example
 * ```js
 * const arr = [70, 30, 40, 10, 80, 20, 90, 100, 75, 60, 45]
 * console.log(shellSort(arr)) // [ 10, 20, 30, 40, 45, 60, 70, 75, 80, 90, 100 ]
 * ```
 */
function shellSort(arr) {
  let [len, temp, gap] = [arr.length, undefined, 1]
  while (gap < len / 3) {
    gap = gap * 3 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i]
      let j = i - gap
      for (; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  return arr
}
