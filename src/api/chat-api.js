let subcribers = {
    'messages-received': [],
    'status-changed': [],
}
let ws
const closeHandler = () => {
   subcribers['status-changed'].forEach(s => s('pending'))
   setTimeout(createChannel, 3000);
}
const messageHandler = (e) => {
    const newMessages = JSON.parse(e.data)
    subcribers['messages-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
    subcribers['status-changed'].forEach(s => s('ready'))
}
const errorHandler = () => {
    subcribers['status-changed'].forEach(s => s('error'))
}
// const cleanUp = ()=>{}
function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    subcribers['status-changed'].forEach(s => s('pending'))
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}
export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subcribers['messages-received'] = []
        subcribers['status-changed'] = []
        ws?.close()
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.removeEventListener('open', openHandler)
        ws?.removeEventListener('error', errorHandler)
    },
    subscribe(eventName, callback) {
        subcribers[eventName].push(callback)
        return () => {
            subcribers[eventName] = subcribers[eventName].filter(s => s !== callback)

        }
    },
    unsubcribe(eventName, callback) {
        subcribers[eventName] = subcribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message) {
        ws?.send(message)
    }

}