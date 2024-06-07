import { EventDispatcher } from './EventDispather'

/**
初始化并处理事件，
发送消息到服务，
关闭连接，
 */
export class WebSocketClient extends EventDispatcher {
  private url: string
  private ws: WebSocket | null = null
  private connectionState: 'closed' | 'closing' | 'open' | 'connecting' =
    'closed'

  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number = 3
  private reconnectInterval: number = 10000
  private heartbeatInterval: number = 1000 * 2
  private heartbeatTimer?: NodeJS.Timeout
  private stopWs: boolean = false

  constructor(url: string) {
    super()
    this.url = url
  }
  onopen(cb: Function) {
    this.addEventListener('open', cb)
  }
  onclose(cb: Function) {
    this.addEventListener('close', cb)
  }
  onerror(cb: Function) {
    this.addEventListener('error', cb)
  }
  onmessage(cb: Function) {
    this.addEventListener('message', cb)
  }
  connect(): void {
    if (this.reconnectAttempts === 0) {
      this.log('WebSocket', `初始化连接中...`)
    }
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return
    this.ws = new WebSocket(this.url)
    // websocket连接成功
    this.ws.onopen = () => {
      this.stopWs = false
      this.reconnectAttempts = 0
      this.startHeartbeat()
      this.log('WebSocket', `连接成功,等待服务端数据推送[onopen]...`)
      this.dispatchEvent('open', event)
    }
    this.ws.onmessage = (event) => {
      this.log('WebSocket', `收到服务端数据推送[onmessage]...`)
      this.log('WebSocket', event.data)
      this.dispatchEvent('message', event)
    }
    this.ws.onclose = () => {
      if (this.reconnectAttempts === 0) {
        this.log('WebSocket', `连接断开,尝试重新连接[onclose]...`)
      }
      this.handleReconnect()
      this.dispatchEvent('close', event)
    }
    this.ws.onerror = () => {
      if (this.reconnectAttempts === 0) {
        this.log('WebSocket', `连接错误,尝试重新连接[onerror]...`)
      }
      this.handleReconnect()
      this.dispatchEvent('error', event)
    }
  }
  private closeHeartbeat(): void {
    clearInterval(this.heartbeatTimer)
    this.heartbeatTimer = undefined
  }
  private startHeartbeat(): void {
    if (this.stopWs) return
    if (this.heartbeatTimer) this.closeHeartbeat()
    this.heartbeatTimer = setInterval(() => {
      if (this.ws) {
        this.ws.send(JSON.stringify({ type: 'heartBeat', data: {} }))
        this.log('WebSocket', '送心跳数据...')
      } else {
        console.error('WebSocket', '没有连接，无法发送心跳数据...')
      }
    }, this.heartbeatInterval)
  }
  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      this.log(
        'WebSocket',
        `连接错误,尝试重新连接[${this.reconnectAttempts}/${this.maxReconnectAttempts}]...`
      )
      setTimeout(() => {
        this.connect()
      }, this.reconnectAttempts * this.reconnectInterval)
    } else {
      this.log('WebSocket', `最大重连失败，终止重连: ${this.url}`)
    }
  }
  send(message: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message)
    } else {
      this.log('WebSocket', `连接未建立,无法发送消息[send]...`)
    }
  }
  /**
   * 尝试关闭WebSocket连接。
   * 如果WebSocket正在关闭或已经关闭，则此操作无效。
   * 异常将被捕获并处理，不会影响程序的其他部分。
   */
  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (
        this.connectionState !== 'closed' &&
        this.connectionState !== 'closing'
      ) {
        this.connectionState = 'closing'
        try {
          if (this.ws) {
            this.stopWs = true
            this.ws.close()
            this.ws = null
            this.removeEventListener('open')
            this.removeEventListener('message')
            this.removeEventListener('close')
            this.removeEventListener('error')
          }
          this.closeHeartbeat()
          resolve()
          this.connectionState = 'closed'
        } catch (error) {
          console.error('Failed to close the WebSocket connection:', error)
          this.connectionState = 'closed'
          reject(error)
        }
      }
    })
  }
}
