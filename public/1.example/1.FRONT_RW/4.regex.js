const re = /\d+/g
const re2 = new RegExp('\\d+', 'g')
const rul = '\\d+'
const re3 = new RegExp(rul, 'g')
// + 匹配前面一个表达式一次或多次，等价于 {1, }
// ? 匹配前面一个表达式零次或一次，等价于 {0, 1}
// . 默认匹配除换行符之外的任何单个字符
// x(?=y) 匹配 x 仅仅当 x 后面跟着 y。这种叫做先行断言
// (?<=y)x 匹配 x 仅当 x 前面是 y 时。这种叫做后行断言
// x(?!y) 仅仅当 x 后面不跟着 y 时匹配 x，这种称为正向否定查找
// (?<!y)x 仅仅当 x 前面不是 y 时匹配 x，这种称为反向否定查找
// x|y 匹配 x 或 y
// {n} n 是一个正整数，匹配了前面一个字符刚好出现了 n 次
// {n,} 匹配前一个字符至少出现了n次
// {n, m} 匹配前面的字符至少出现了n 次，最多m次
// [xyz] 一个字符集合，匹配方括号任意字符
// [^xyz] 匹配任何没有包含在方括号中的字符
// \b 匹配一个词的边界，例如在字母和空格之间
// \B 匹配一个非单词边界
// \d 匹配一个数字
// \D 匹配一个非数字字符
// \f 匹配一个换页符
// \n 匹配一个换行符
// \r 匹配一个回车符
// \s 匹配一个空白符，包括空格、制表符、换页符和换行符
// \S 匹配一个非空白字符
// \w 匹配一个单字字符（字母、数字或者下划符）
// \W 匹配一个非单字字符

// g 全局搜索
// i 不区分大小写搜索
// m 多行搜索
// s 允许 .
// u 使用 unicode
// y 执行“粘性(sticky)”搜索，匹配从目标字符串的当前位置开始

// 贪婪模式
const reg = /ab{1,3}c/

const string = '12345'
const regx = /(\d{1,3})(\d{1,3})/
// console.log(string.match(regx))

// 懒惰模式
// var string = '12345'
var regex = /(\d{1,3}?)(\d{1,3})/
// console.log(string.match(regex))

// 换组
// let str = 'John Smith'
// console.log(str.replace(/(john) (smith)/i, '$2, $1'))

let str = 'I love JavaScript'
let result = str.match(/HTML/g)

const regexp = /t(e)(st(\d?))/g
const str1 = 'test1test2'
const array = [...str1.matchAll(regexp)]

const str2 = 'A drop of ink may make a million think'

const reg1 = /javascript/i

const reg2 = /javascript/gi
// console.log('hello Javascript Javascript Javascript'.replace(reg1, 'js'))
// console.log('hello Javascript Javascript Javascript'.replace(reg2, 'js'))

// console.log('12, 34, 56'.split(/,\s*/))
let str3 = 'More about JavaScript at https://javascript.info'
let regexp2 = /javascript/gi
let result2
while ((result2 = regexp2.exec(str3))) {
  // console.log(`Found ${result2[0]} at position ${result2.index}`)
}

let str4 = 'I love JavaScript'
// console.log(/love/i.test(str4));
const reg4 = /^[1-9][0-9]{4,14}$/
// console.log(reg4.exec(1228318390))

const patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]{4,19})/
// console.log(patrn.exec('bddsa'));

// 解析 url
const url = 'https://www.baidu.com/s?wd=123456'
const protocol = '(?<protocol>https?:)'
const host = '(?<host>(?<hostname>[^/#?:]+)(?::(?<port>\\d+))?)'
const path = '(?<pathname>(?:\\/[^/#?]+)*\\/?)'
const search = '(?<search>(?:\\?[^#]*)?)'
const hash = '(?<hash>(?:#.*)?)'
const reg3 = new RegExp(`^${protocol}\/\/${host}${path}${search}${hash}$`)
function execURL(url) {
  const result = reg3.exec(url)
  if (result) {
    result.groups.port = result.groups.port || ''
    return result.groups
  }
  return {
    protocol: '',
    host: '',
    pathname: '',
    search: '',
    hash: '',
    hostname: '',
    port: '',
  }
}
console.log(execURL(url))
