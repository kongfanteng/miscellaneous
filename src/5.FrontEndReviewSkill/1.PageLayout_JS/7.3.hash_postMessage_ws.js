// Hash, A->B, 1.A 中加载 B 的 iframe，2.A获取B的iframe, 3.修改iframe.src，4.B中监听onhashchange，location.hash
// 利用hash，场景是当前页面 A 通过iframe或frame嵌入了跨域的页面 B
// 在A中伪代码如下：
var B = document.getElementsByTagName('iframe')
B.src = B.src + '#' + 'data'
// 在B中的伪代码如下
window.onhashchange = function () {
  var data = window.location.hash
}

// postMessage
// 窗口A(http:A.com)向跨域的窗口B(http:B.com)发送信息
// 在父窗口中
var popup = window.open('http://b')
setTimeout(() => {
  popup.postMessage('Hello, World!', 'http://b')
}, 1000)
// 在窗口B中监听
Awindow.addEventListener(
  'message',
  function (event) {
    console.log(event.origin)
    console.log(event.source)
    console.log(event.data)
  },
  false
)

const ws = new WebSocket('ws://localhost:3000')
// onopen+onmessage+onclose
ws.onopen = () => {
  console.log('Connection open ...')
  ws.send('Hello, World!')
}
ws.onmessage = (event) => {
  console.log('Received: ' + event.data)
  ws.close()
}
