import databaseController from './db.controller.js'
class SocketController {
  constructor (socket) {
    this.socket = socket
  }

  async login (...args) {
    const [uuid] = args
    console.log('uuid: ', uuid)
    if (!uuid) {
    //   const client = await databaseController.addClient({ name: '' })
    }
    this.socket.broadcast.emit('user connected', uuid)
  }

  async move (...args) {
    const [posX, posY] = args
    console.log(`X: ${posX}, Y: ${posY}`)
  }
}

export { SocketController }
