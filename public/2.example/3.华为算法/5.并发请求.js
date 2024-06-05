// 假设外部初始化
let results = [] // 存储请求结果
let executing = [] // 存储正在执行的请求URL

// 验证URL格式的函数
function isValidURL(url) {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}

// 用于处理单个请求的函数
async function fetchURL(url) {
  console.log('请求中', url)
  try {
    let res = await fetch(url)
    return { success: true, response: res }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// 主函数，用于控制并发请求
async function run(urls, maxNum) {
  if (!Array.isArray(urls) || urls.length === 0 || maxNum <= 0) {
    throw new Error('无效的输入')
  }

  while (urls.length > 0 || executing.length > 0) {
    // 当还有未完成的请求时，等待它们完成
    if (executing.length < maxNum && urls.length > 0) {
      const url = urls.shift()
      if (isValidURL(url)) {
        executing.push(url)
        const result = await fetchURL(url)
        results.push(result)
      } else {
        results.push({ error: true, message: `无效的URL: ${url}` })
      }
    }

    // 等待正在执行的请求完成
    await new Promise((resolve) => setTimeout(resolve, 0))
  }

  // 所有请求完成，返回结果
  return results
}
const urls = ['1,', '2', '3']
run(urls, 2).then((results) => {
  console.log(results)
})

// 使用示例
// 假设urls和maxNum已经定义
// async function example() {
//   const results = await run(urls, maxNum);
//   console.log(results);
// }
