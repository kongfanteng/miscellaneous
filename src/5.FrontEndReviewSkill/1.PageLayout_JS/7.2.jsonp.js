/**
 * @description: jsonp跨域
 * @param {*} options
 * @return {*}
 * @example
 *
 * ```js
  jsonp({
    url: 'http://localhost:3000/jsonp',
    params: {
      name: 'zhangsan',
    },
    callbackName: 'callback',
    success: (res) => {
      console.log(res)
    },
    onerror: (err) => {
      console.log('error', err)
    },
  })
  * ```
  */
const jsonp = (options = {}) => {
  // 1.函数名，2.注册此全局函数，3.创建script，4.监听脚本加载，5.删除全局函数，6.加载script标签
  if (!options.url) throw new Error('url is required')
  if (!options.callbackName) throw new Error('callbackName is required')
  if (!options.success) throw new Error('success is required')

  const { url, params, callbackName, success, onerror } = options
  const data = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')

  window[callbackName] = (res) => {
    if (
      success &&
      Object.prototype.toString.call(success) === '[object Function]'
    ) {
      success(res)
    }
  }

  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('charset', 'utf-8')
  script.setAttribute('src', `${url}?${data}&callback=${callbackName}`)
  script.async = true

  script.onload = () => {
    if (!script.readyState || /loaded|complete/.test(script.readyState)) {
      script.onload = script.onreadystatechange = null
      script.parentNode && script.parentNode.removeChild(script)
      window[callbackName] = null
    }
  }
  script.onerror = () => {
    if (
      onerror &&
      Object.prototype.toString.call(onerror) === '[object Object]'
    ) {
      onerror()
    }
  }
  document.body.appendChild(script)
}
