import { SocketController } from './controllers/socket.controller.js'
import socketList from './socket-list.js'

export default async (socket) => {
  const socketController = new SocketController(socket)

  console.log('\x1b[32m%s\x1b[0m', 'Client connected...')

  // сохраняем в списке socket.id и accessKey
  const accessKey = await socketController.getAccessKey()
  socketList.add({ socketId: socket.id, accessKey },
    socketController.setOnline)

  socket.on('move', socketController.onMove)

  /**
   * Здесь, возможно, очередной "костыль"
   * socket в socketController именно в `diconnect` почему-то undefined...
   * Поэтому я его явно передаю
   */
  socket.on('disconnect', () => socketController.onDisconnect(socket))
}
