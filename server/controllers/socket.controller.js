import databaseController from './db.controller.js'
import socketList from '../socket-list.js'

class SocketController {
  // constructor (socket) {
  //   this.socket = socket
  // }

  useSocket (socket) {
    this.socket = socket
  }

  /**
   * Отправляет `tocken` пользователю после успешной авторизации
   * @returns Возвращает `token`
   */
  async clientLogin () {
    // проверяем accessKey из запроса...
    const { accessKey } = this.socket.handshake?.query

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

    const defaultPoint = { x: 300, y: 300 }
    socketList.add({
      socketId: this.socket.id,
      accessKey: client.uuid,
      id: client.id,
      name: client.name,
      point: defaultPoint
    })

    // получаем список клиентов, которые онлайн
    const payload = socketList.getClientInfoBySocketId(this.socket.id)

    this.socket.broadcast.emit('user connected', payload)

    // отправляем сообщение
    const token = client.toJSON()
    this.socket.emit('token', {
      ...token,
      onlineClients: socketList.getOnlineClients()
    })

    return token
  }

  /**
   * Обрабатывает событие `user move`
   * @param {Socket} socket объект Socket
   * @param  {...any} args массив параметров
   */
  async onMove (socket, ...args) {
    const [point] = args
    const item = socketList.getItem(socket.id)
    item.point = point
    const payload = socketList.getClientInfoBySocketId(socket.id)

    this.socket.broadcast.emit('user move', payload)
  }

  /**
   * Обрабатывает событие `disconnected`
   * @param {Socket} socket объект Socket
   */
  async onDisconnect (socket) {
    const { accessKey } = socketList.getItem(socket.id)
    const client = await databaseController.getClientByUUID(accessKey)
    socketList.delete(this.socket.id)

    console.log('\x1b[31mClient `%s` disconnected\x1b[0m', client.name)
    this.socket.broadcast.emit('user disconnected', { id: client.id, name: client.name })
  }
}

export { SocketController }
