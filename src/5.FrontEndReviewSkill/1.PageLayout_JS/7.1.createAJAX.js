/**
 * @param {Params} options
 * @typedef {Object} Params
 * @property {string} url
 * @property {string|'get'} type
 * @property {Object} data
 * @property {Function} success
 * @property {Function} error
 */
const createAJAX = (options = {}) => {
  if (!options.url) throw new Error('url is required')
  if (typeof options.success !== 'function')
    throw new Error('success is function')
  const opt = {
    ...options,
    type: options.type || 'GET',
    data: options.data || {},
    success: options.success,
    error: options.error || function () {},
  }
  // 1.声明对象，2.open，3.send，5.响应onload，200|304
  const xhr = XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP')
  let { data, url, type } = opt
  const dataArr = []
  for (const k in data) {
    dataArr.push(`${k}=${data[k]}`)
  }
  if (type.toLowerCase() === 'get') {
    url = `${url}?${dataArr.join('&')}`
    xhr.open(type, url.replace(/\?$/g, ''), true)
    xhr.send()
  }
  if (type.toLowerCase() === 'post') {
    xhr.open(type, url, true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send(dataArr.join('&'))
  }
  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 304) {
      let res
      if (opt.success && opt.success instanceof Function) {
        res = xhr.responseText
        if (typeof res === 'string') {
          try {
            res = JSON.parse(res)
          } catch (e) {
            res = res
          }
          opt.success.call(xhr, res)
        }
      }
    } else {
      if (opt.error && opt.error instanceof Function) {
        opt.error.call(xhr, {
          status: xhr.status,
          message: xhr.responseText,
        })
      }
    }
  }
}
