import { WebSocketClient } from './client/WebSocketClient'
const url = `ws://localhost:3200/test`
const socket = new WebSocketClient(url)
socket.connect()
