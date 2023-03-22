let subcribers = []
let ws
const closeHandler = () => {
    setInterval(() => { createChannel() }, 3000);
}
const messageHandler = (e) => {
    const newMessages = JSON.parse(e.data)
    subcribers.forEach(s => s(newMessages))
}
function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}
export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subcribers = []
        ws?.close()
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
    },
    subscribe(callback) {
        subcribers.push(callback)
    },
    unsubcribe(callback) {
        subcribers.filter(s => s !== callback)
    },
    sendMessage(message) {
        ws?.send(message)
    }

}