type Subscriber<T> = (value: T) => void

type SubscribersType<T> = {
  'messages-received': Subscriber<T>[]
  'status-changed': Subscriber<StatusType>[]
}

type StatusType = 'pending' | 'ready' | 'error'

let subscribers: SubscribersType<any> = {
  'messages-received': [],
  'status-changed': [],
}

let ws: WebSocket | null = null

const closeHandler = () => {
  notifySubscribersAboutStatus('pending')
  setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  notifySubscribersAboutMessages(newMessages)
}

const openHandler = () => {
  notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
  notifySubscribersAboutStatus('error')
}

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach((s) => s(status))
}

const notifySubscribersAboutMessages = (messages: any[]) => {
  subscribers['messages-received'].forEach((s) => s(messages))
}

function createChannel() {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
  ws?.close()

  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

  notifySubscribersAboutStatus('pending')

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
    subscribers['messages-received'] = []
    subscribers['status-changed'] = []
    ws?.close()
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
  },
  subscribe<T>(eventName: keyof SubscribersType<T>, callback: Subscriber<T>): () => void {
    subscribers[eventName].push(callback)
    return () => {
      subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback)
    }
  },
  unsubcribe<T>(eventName: keyof SubscribersType<T>, callback: Subscriber<T>) {
    subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  },
}