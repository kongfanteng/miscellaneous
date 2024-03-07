/**
 * 上拉加载
 * @param {Function} cb - 回调函数
 * @example
 * 
 * 核心逻辑: scrollTop + clientHeight >= scrollHeight
 *
 * 测试:
    window.addEventListener('scroll', () => {
      const cb = () => console.log('开始加载数据')
      pullUpToDown(cb)
    }) 
 * 
 * 代码描述：
 * 1. 定义 clientHeight、scrollHeight、scrollTop、distance
 * 2. 判断 scrollTop + clientHeight >= scrollHeight - distance
 * 3. 执行回调函数
 * 
 * @returns {void}
 */
function pullUpToDown(cb) {
  const clientHeight = document.documentElement.clientHeight
  const scrollHeight = document.body.scrollHeight
  const scrollTop = document.documentElement.scrollTop
  let distance = 50
  if (scrollTop + clientHeight >= scrollHeight - distance) {
    cb && cb()
  }
}
/**
 * 下拉刷新
 * @param {HTMLElement} el - 元素
 * @param {HTMLElement} refreshText
 * @example
 * 
 * 测试：
 * ```html
    // HTML
    <p class="refreshText"></p>
    <div id="container"></div>
    <style>
      .container {
        display: flex;
        flex-wrap: wrap;
      }
      .target {
        margin: 5px;
        width: 20px;
        height: 20px;
        background: red;
      }
    </style>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
      const $container = $('#container')
      function createTarget() {
        const htmlString = new Array(100)
          .fill('<div class="target"></div>')
          .join('')
        $container.append(htmlString)
      }
      createTarget()
    </script>
 * ```
 *
 * ```js
    // JS 调用
    const el = document.getElementById('container')
    const refreshText = document.querySelector('.refreshText')
    pullDownRefresh(el, refreshText)
 * ```
 * 
 * 函数逻辑：
 * 1. 获取元素的 clientHeight 和 scrollHeight
 * 2. 监听 touchstart、touchmove、touchend 事件
 * 3. 根据 touchstart、touchmove、touchend 事件的坐标计算出元素的 translateY 值
 * 4. 根据 translateY 值改变元素的 transform 属性
 * 
 */
function pullDownRefresh(el, refreshText) {
  let _startPos = 0,
    _transitionHeight = 0
  el.addEventListener(
    'touchstart',
    function (e) {
      _startPos = e.touches[0].pageY
      el.style.postion = 'relactive'
      el.style.transition = 'transform 0s'
    },
    false
  )
  el.addEventListener(
    'touchmove',
    function (e) {
      _transitionHeight = e.touches[0].pageY - _startPos
      if (_transitionHeight > 0 && _transitionHeight < 60) {
        refreshText.innerText = '下拉刷新...'
        el.style.transform = `translateY(${_transitionHeight}px)`
        if (_transitionHeight >= 55) {
          refreshText.innerText = '松开刷新...'
        }
      }
    },
    false
  )
  el.addEventListener(
    'touchend',
    function (e) {
      el.style.transition = 'transform 0.3s ease 1s'
      el.style.transform = `translateY(0px)`
      refreshText.innerText = '更新中...'
    },
    false
  )
}
