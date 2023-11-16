import databaseController from './db.controller.js'
import socketList from '../socket-list.js'

class SocketController {
  constructor (socket) {
    this.socket = socket
  }

  async getAccessKey () {
    const { accessKey } = this.socket.handshake?.query
    console.log('\x1b[33m\x1b[31m%s\x1b[0m', accessKey)

    let client
    if (!accessKey) {
      console.log('adding new client...')
      client = await databaseController.addClient('client')
      client.set({ name: client.name + client.id })
      await client.save()
    } else {
      console.log('return exists client...')
      client = await databaseController.getClientByUUID(accessKey)
    }
    this.socket.emit('token', client.toJSON())

    console.log('Broadcast token \x1b[33m\x1b[35m%s\x1b[0m', client.uuid)
    this.socket.broadcast.emit('user connected', { id: client.id, name: client.name })

    return client.uuid
  }

  async setOnline (accessKey, online) {
    databaseController.setClientStatus(accessKey, online)
  }

  async onMove (...args) {
    const [posX, posY] = args
    console.log(`X: ${posX}, Y: ${posY}`)
  }

  async onDisconnect (socket) {
    const { accessKey } = socketList.getAccessKeyBySocketId(socket.id)
    const client = await databaseController.getClientByUUID(accessKey)
    socketList.delete(this.socket.id)
    await this.setOnline(accessKey, false)
    console.log('\x1b[31mClient `%s` disconnected\x1b[0m', client.name)
    this.socket.broadcast.emit('user disconnected', { id: client.id, name: client.name })
    console.log(socketList.sockets)
  }
}

export { SocketController }
