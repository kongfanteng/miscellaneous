const concurrencyRequest = (urls, maxNum) => {
  return new Promise((resolve) => {
    const results = []
    const excuting = []
    const run = async (url) => {
      try {
        let res = await fetch(url)
        results.push(res)
        console.log('请求中', url)
      } catch (error) {
        results.push({ error: true, message: error.message })
      } finally {
        const index = excuting.indexOf(url)
        if (index !== -1) {
          excuting.splice(index, 1)
        }
      }
      if (urls.length > 0 && excuting.length < maxNum) {
        const url = urls.shift()
        run(url)
        excuting.push(url)
      }
      if (urls.length === 0 && excuting.length === 0) resolve(results)
    }
    for (let i = 0; i < Math.min(maxNum, urls.length); i++) {
      const url = urls.shift()
      run(url)
      excuting.push(url)
    }
  })
}
const urls = [
  'url1',
  'url2',
  'url3',
  'url4',
  'url5',
  'url6',
  'url7',
  'url8',
  'url9',
]
const maxNum = 3
concurrencyRequest(urls, maxNum)
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.log(error)
  })
