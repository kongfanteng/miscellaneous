/**
 * 单词倒排算法
 * @see https://www.nowcoder.com/practice/81544a4989df4109b33c2d65037c5836
 * @example
 *
 * 单词，倒排，大小写字母，间隔符，空格，20
 * I am a student, student a am I, $bo*y gi!r#l, l r gi y bo
 * split, /[^a-zA-Z]+/g
 * reverse, 97, Array, 97+26=123,
 * split(' ').reverse().join(' ')
 * splice(/[^a-zA-Z]+/g, ' ').reverse().join('')
 */
function reverse(str) {
  // split_a_z_Trim; replace_a_z;
  const split_a_z_Trim = (str) => {
    const res = str
      .split(/[^a-z]+/gi)
      .reverse()
      .join(' ')
      .trim()
    console.log(res)
  }
  // split_a_z_Trim(str)
  const replace_a_z = (str) => {
    const res = str
      .replace(/[^a-z]+/gi, ' ')
      .split(' ')
      .reverse()
      .join(' ')
    console.log(res)
  }
  replace_a_z(str)
}
reverse('$AO*y gi!r#l')
