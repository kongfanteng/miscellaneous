/**
 * 字符串最后一个单词的长度
 * @example
 *
 * 最后一个单词长度，空格，总len<5000, hello nowcoder, 8, split(" "), pop().length
 *
 */
function lastWordLength(str) {
  // splitPop; lengthLastIndexOf; matchS; splitLen减1的length;
  const splitPop = (str) => {
    const len = str.trim().split(' ').pop().length
    console.log(len)
  }
  splitPop(str)
  const lengthLastIndexOf = (str) => {
    const len = str.length - str.lastIndexOf(' ') - 1
    console.log(len)
  }
  // lengthLastIndexOf(str)
  const matchS = (str) => {
    const len = str.match(/\s{0,1}[\S]*\S$/g)[0].trim().length
    console.log(len)
  }
  // matchS(str)
  const splitLen减1的length = (str) => {
    const arr = str.split(' ')
    const len = arr[arr.length - 1].length
    console.log(len)
  }
  // splitLen减1的length(str)
}
lastWordLength('hello nowcoder')
