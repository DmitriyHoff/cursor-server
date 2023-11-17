import databaseController from './db.controller.js'
import socketList from '../socket-list.js'

class SocketController {
  // constructor (socket) {
  //   this.socket = socket
  // }

  useSocket (socket) {
    this.socket = socket
  }

  async clientLogin () {
    // проверяем accessKey из запроса...
    const { accessKey } = this.socket.handshake?.query
    console.log('\x1b[33m\x1b[31m%s\x1b[0m', accessKey)

    let client

    // если не указан - создаём нового клиента
    if (!accessKey) {
      console.log('adding new client...')
      client = await databaseController.addClient('client')
      client.set({ name: `${client.name}${client.id}` })
      await client.save()

    // если указан - возвращаем существующего
    } else {
      console.log('return exists client...')
      client = await databaseController.getClientByUUID(accessKey)
    }

    const defaultPoint = { x: 0, y: 0 }
    socketList.add({
      socketId: this.socket.id,
      accessKey: client.uuid,
      id: client.id,
      name: client.name,
      point: defaultPoint
    })

    // получаем список клиентов, которые онлайн
    const onlineUsers = socketList.getOnlineAccessKeys()
    // получаем информацию о них из БД
    // const onlineClients = await databaseController.getClientsByUUID(...onlineUsers)
    const payload = socketList.getClientInfoBySocketId(this.socket.id) // { id: client.id, name: client.name, point: defaultPoint }

    this.socket.broadcast.emit('user connected', payload)

    // console.log('onlineClients: ', onlineClients)

    // отправляем сообщение
    const payload2 = client.toJSON()
    this.socket.emit('token', {
      ...payload2,
      onlineClients: socketList.getOnlineClients()
    })
    return client
  }

  async onMove (socket, ...args) {
    const [point] = args
    const item = socketList.getItem(socket.id)
    // if (!item) return
    // console.log('item: ', item)
    item.point = point
    const payload = socketList.getClientInfoBySocketId(socket.id)

    // const payload = { clientId: client.clientId, clientName: client.clientName, point: client.point }
    this.socket.broadcast.emit('user move', payload)
  }

  async onDisconnect (socket) {
    const { accessKey } = socketList.getItem(socket.id)
    const client = await databaseController.getClientByUUID(accessKey)
    socketList.delete(this.socket.id)

    console.log('\x1b[31mClient `%s` disconnected\x1b[0m', client.name)
    this.socket.broadcast.emit('user disconnected', { id: client.id, name: client.name })
  }
}

export { SocketController }
